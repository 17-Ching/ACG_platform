<script setup>
import { computed } from 'vue'
import FinaleMailbox from '../components/FinaleMailbox.vue'
import FinaleEndingExpose from '../components/FinaleEndingExpose.vue'
import FinaleEndingSilence from '../components/FinaleEndingSilence.vue'
import { useFinaleStore } from '../stores/finale.js'
import { VISITOR_ID } from '../stores/visitorPosts.js'

// 訪客自己的信匣。條件未到只是一個空信匣;條件到了(見 stores/finale.js)
// 進入信匣流程(座標信 → 兩封新信),回信後依選擇切換結局。
const finale = useFinaleStore()

const stage = computed(() => {
  if (!finale.evidenceReady) return 'empty'
  if (finale.choice === 'expose') return 'expose'
  if (finale.choice === 'silence') return 'silence'
  return 'mailbox'
})
</script>

<template>
  <div
    v-if="stage === 'empty'"
    class="border border-bbs-border bg-bbs-panel px-3 py-8 text-center"
  >
    <p class="text-bbs-accent">┌ 站內信匣 ─ {{ VISITOR_ID }}</p>
    <p class="mt-4 text-bbs-dim">(沒有新訊息。)</p>
  </div>

  <FinaleMailbox v-else-if="stage === 'mailbox'" />
  <FinaleEndingExpose v-else-if="stage === 'expose'" />
  <FinaleEndingSilence v-else />
</template>
