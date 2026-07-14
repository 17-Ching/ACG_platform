<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import FinaleOutro from './FinaleOutro.vue'
import { endingExpose } from '../data/finale.js'

const tickerText = computed(() => endingExpose.ticker.join('　──　'))

const messages = [
  { id: 'kk-1', ...endingExpose.messages[0] },
  { id: 'kk-2', ...endingExpose.messages[1] },
]

// 唯一保留的時間差:k_r_o_w 帳號狀態在幾秒後由在線上轉為離線
const offline = ref(false)
let timer = null
onMounted(() => {
  timer = setTimeout(() => (offline.value = true), 5000)
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- 沒回的那封信,停在未讀 -->
    <MessageThread :messages="[endingExpose.unreadLetter]" />

    <!-- 新聞跑馬燈 -->
    <div class="overflow-hidden border border-bbs-border bg-bbs-panel py-1">
      <div class="ticker whitespace-nowrap text-bbs-warn">{{ tickerText }}</div>
    </div>

    <MessageThread :messages="messages" />

    <!-- k_r_o_w 帳號狀態 -->
    <div class="border border-bbs-border bg-bbs-panel">
      <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
        ┌ 使用者名片 ─ k_r_o_w
      </div>
      <dl class="grid grid-cols-[6rem_1fr] gap-x-2 px-3 py-2">
        <dt class="text-bbs-dim">目前狀態</dt>
        <dd>
          <span v-if="!offline" class="text-bbs-push">● 在線上</span>
          <span v-else class="text-bbs-dim">○ 離線</span>
        </dd>
      </dl>
    </div>

    <!-- KKcat 名片:簽名檔悄悄換了一句 -->
    <div class="border border-bbs-border bg-bbs-panel">
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

    <FinaleOutro />
  </div>
</template>

<style scoped>
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
