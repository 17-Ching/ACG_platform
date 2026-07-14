<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import FinaleOutro from './FinaleOutro.vue'
import { endingSilence, evidenceItems } from '../data/finale.js'

// 逐段淡入:轉帳通知 → 清單刪除 → KKcat 兩則未讀 → 飄版新懸賞文 →
// KKcat 最後一篇 → 片尾
const BEATS = [400, 2000, 4500, 7500, 11500, 14500, 16500]
const beat = ref(0)
let timers = []

onMounted(() => {
  timers = BEATS.map((ms, i) => setTimeout(() => (beat.value = i + 1), ms))
})
onUnmounted(() => timers.forEach(clearTimeout))

const shownUnread = computed(() => {
  const list = []
  if (beat.value >= 3) list.push({ id: 'kk-1', ...endingSilence.unread[0] })
  if (beat.value >= 4) list.push({ id: 'kk-2', ...endingSilence.unread[1] })
  return list
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- 錢到帳,畫面安靜 -->
    <Transition name="fade">
      <div
        v-if="beat >= 1"
        class="whitespace-pre-wrap border border-bbs-border bg-bbs-panel px-3 py-2"
      >{{ endingSilence.receipt }}</div>
    </Transition>

    <!-- 手上的東西,一項一項不見 -->
    <Transition name="fade">
      <div v-if="beat >= 2" class="border border-bbs-border bg-bbs-panel">
        <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
          ┌ 暫存檔 ─ 你手上的東西
        </div>
        <ul class="px-3 py-2">
          <li v-for="(item, i) in evidenceItems" :key="i" class="flex gap-2 py-0.5 text-bbs-dim">
            <span class="shrink-0">▪</span>
            <span class="flex-1 line-through">{{ item.label }}</span>
            <span class="shrink-0">已刪除</span>
          </li>
        </ul>
      </div>
    </Transition>

    <!-- KKcat 傳來的訊息,停在未讀 -->
    <Transition name="fade">
      <MessageThread v-if="beat >= 3" :messages="shownUnread" />
    </Transition>

    <!-- 飄版最底出現另一個沉寂帳號的新懸賞文 -->
    <Transition name="fade">
      <article v-if="beat >= 5" class="border border-bbs-border bg-bbs-panel">
        <header class="border-b border-bbs-border px-3 py-2">
          <div>
            <span class="text-bbs-dim">作者</span>
            <RouterLink
              :to="`/user/${endingSilence.newBounty.author}`"
              class="ml-2 text-bbs-bright hover:underline"
            >{{ endingSilence.newBounty.author }}</RouterLink>
            <span class="float-right text-bbs-dim">
              看板 <span class="text-bbs-accent">{{ endingSilence.newBounty.board }}</span>
            </span>
          </div>
          <div>
            <span class="text-bbs-dim">標題</span>
            <span class="ml-2 text-bbs-warn">{{ endingSilence.newBounty.title }}</span>
          </div>
          <div>
            <span class="text-bbs-dim">時間</span>
            <span class="ml-2">{{ endingSilence.newBounty.time }}</span>
          </div>
        </header>
        <div class="whitespace-pre-wrap break-words px-3 py-3">{{ endingSilence.newBounty.lines.join('\n') }}</div>
      </article>
    </Transition>

    <!-- KKcat 最後一篇公開發文 -->
    <Transition name="fade">
      <article v-if="beat >= 6" class="border border-bbs-border bg-bbs-panel">
        <header class="border-b border-bbs-border px-3 py-2">
          <div>
            <span class="text-bbs-dim">作者</span>
            <span class="ml-2 text-bbs-bright">{{ endingSilence.lastPost.author }}</span>
          </div>
          <div>
            <span class="text-bbs-dim">標題</span>
            <span class="ml-2 text-bbs-warn">{{ endingSilence.lastPost.title }}</span>
          </div>
        </header>
        <div class="whitespace-pre-wrap px-3 py-3">{{ endingSilence.lastPost.content }}</div>
      </article>
    </Transition>

    <Transition name="fade">
      <FinaleOutro v-if="beat >= 7" />
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
