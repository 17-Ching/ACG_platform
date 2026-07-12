<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import {
  evidenceItems,
  evidenceFooter,
  transferNotice,
  bountyQuote,
  kkcatFinalWords,
} from '../data/finale.js'
import { useFinaleStore } from '../stores/finale.js'

const finale = useFinaleStore()

// 逐段浮現的節奏(毫秒):入帳通知 → 引述 → KKcat 兩則 → 選項
const BEATS = [1200, 3200, 5200, 7200, 9200]
const beat = ref(0)
let timers = []

onMounted(() => {
  timers = BEATS.map((ms, i) => setTimeout(() => (beat.value = i + 1), ms))
})
onUnmounted(() => timers.forEach(clearTimeout))

const shownMessages = computed(() => {
  const list = []
  if (beat.value >= 1) list.push({ id: 'notice', ...transferNotice })
  if (beat.value >= 3) list.push({ id: 'kk-1', ...kkcatFinalWords[0] })
  if (beat.value >= 4) list.push({ id: 'kk-2', ...kkcatFinalWords[1] })
  return list
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- 證據包彙整 -->
    <div class="border border-bbs-border bg-bbs-panel">
      <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
        ┌ 暫存檔 ─ 你手上的東西
      </div>
      <ul class="px-3 py-2">
        <li v-for="(item, i) in evidenceItems" :key="i" class="flex gap-2 py-0.5">
          <span class="shrink-0 text-bbs-dim">▪</span>
          <span class="flex-1">
            <RouterLink
              v-if="item.to"
              :to="item.to"
              class="text-bbs-link hover:text-bbs-bright hover:underline"
            >{{ item.label }}</RouterLink>
            <span v-else class="text-bbs-fg">{{ item.label }}</span>
            <span class="ml-2 text-bbs-dim">{{ item.note }}</span>
          </span>
        </li>
      </ul>
      <div class="border-t border-dashed border-bbs-border px-3 py-2 text-bbs-warn">
        {{ evidenceFooter }}
      </div>
    </div>

    <!-- 站內信:入帳通知 + KKcat 最後一則私訊 -->
    <Transition name="fade">
      <MessageThread v-if="beat >= 1" :messages="shownMessages" />
    </Transition>

    <!-- 引述懸賞主文(關卡 1 那句,在此刻應驗),整塊可點回原文 -->
    <Transition name="fade">
      <RouterLink
        v-if="beat >= 2"
        :to="bountyQuote.to"
        class="block border border-dashed border-bbs-border px-3 py-2 hover:bg-bbs-sel hover:text-bbs-bright"
      >
        <div class="text-bbs-dim">※ 引述【{{ bountyQuote.title }}】</div>
        <div v-for="(line, i) in bountyQuote.lines" :key="i" class="whitespace-pre-wrap">
          {{ line }}
        </div>
      </RouterLink>
    </Transition>

    <!-- 最終選擇 -->
    <Transition name="fade">
      <div v-if="beat >= 5" class="border border-bbs-border bg-bbs-panel px-3 py-4">
        <div class="flex flex-col gap-2">
          <button
            type="button"
            class="block w-full border border-bbs-border px-3 py-2 text-center hover:bg-bbs-sel hover:text-bbs-bright"
            @click="finale.choose('expose')"
          >
            [公開所有證據]
          </button>
          <button
            type="button"
            class="block w-full border border-bbs-border px-3 py-2 text-center hover:bg-bbs-sel hover:text-bbs-bright"
            @click="finale.choose('silence')"
          >
            [刪除所有證據,收下錢]
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 2s ease;
}
.fade-enter-from {
  opacity: 0;
}
</style>
