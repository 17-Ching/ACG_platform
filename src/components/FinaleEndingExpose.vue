<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import FinaleOutro from './FinaleOutro.vue'
import { endingExpose } from '../data/finale.js'

// 逐段浮現:沒回的那封(未讀)→ 跑馬燈 → KKcat 兩則 → k_r_o_w 名片 →
// 狀態轉離線 → KKcat 名片 → 片尾
const BEATS = [600, 2600, 5000, 7200, 10200, 14200, 17200, 20200]
const beat = ref(0)
let timers = []

onMounted(() => {
  timers = BEATS.map((ms, i) => setTimeout(() => (beat.value = i + 1), ms))
})
onUnmounted(() => timers.forEach(clearTimeout))

const tickerText = computed(() => endingExpose.ticker.join('　──　'))

const shownMessages = computed(() => {
  const list = []
  if (beat.value >= 3) list.push({ id: 'kk-1', ...endingExpose.messages[0] })
  if (beat.value >= 4) list.push({ id: 'kk-2', ...endingExpose.messages[1] })
  return list
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- 沒回的那封信,停在未讀 -->
    <Transition name="fade">
      <MessageThread v-if="beat >= 1" :messages="[endingExpose.unreadLetter]" />
    </Transition>

    <!-- 新聞跑馬燈 -->
    <Transition name="fade">
      <div v-if="beat >= 2" class="overflow-hidden border border-bbs-border bg-bbs-panel py-1">
        <div class="ticker whitespace-nowrap text-bbs-warn">{{ tickerText }}</div>
      </div>
    </Transition>

    <Transition name="fade">
      <MessageThread v-if="beat >= 3" :messages="shownMessages" />
    </Transition>

    <!-- k_r_o_w 帳號狀態 -->
    <Transition name="fade">
      <div v-if="beat >= 5" class="border border-bbs-border bg-bbs-panel">
        <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
          ┌ 使用者名片 ─ k_r_o_w
        </div>
        <dl class="grid grid-cols-[6rem_1fr] gap-x-2 px-3 py-2">
          <dt class="text-bbs-dim">目前狀態</dt>
          <dd>
            <Transition name="fade" mode="out-in">
              <span v-if="beat < 6" class="text-bbs-push">● 在線上</span>
              <span v-else class="text-bbs-dim">○ 離線</span>
            </Transition>
          </dd>
        </dl>
      </div>
    </Transition>

    <!-- KKcat 名片:簽名檔悄悄換了一句 -->
    <Transition name="fade">
      <div v-if="beat >= 7" class="border border-bbs-border bg-bbs-panel">
        <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
          ┌ 使用者名片 ─ KKcat
        </div>
        <dl class="grid grid-cols-[6rem_1fr] gap-x-2 px-3 py-2">
          <dt class="text-bbs-dim">目前狀態</dt>
          <dd class="text-bbs-dim">○ 離線</dd>
        </dl>
        <div class="border-t border-dashed border-bbs-border px-3 py-2">
          <div class="text-bbs-dim">簽名檔:</div>
          <pre class="whitespace-pre-wrap font-mono text-bbs-dim">「{{ endingExpose.signature }}」</pre>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <FinaleOutro v-if="beat >= 8" />
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
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-leave-to {
  opacity: 0;
}
.ticker {
  display: inline-block;
  padding-left: 100%;
  animation: ticker-roll 32s linear infinite;
}
@keyframes ticker-roll {
  to {
    transform: translateX(-100%);
  }
}
</style>
