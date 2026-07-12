<script setup>
import { computed } from 'vue'
import FinaleChoice from '../components/FinaleChoice.vue'
import FinaleEndingExpose from '../components/FinaleEndingExpose.vue'
import FinaleEndingSilence from '../components/FinaleEndingSilence.vue'
import { useFinaleStore } from '../stores/finale.js'
import { VISITOR_ID } from '../stores/visitorPosts.js'

// 訪客自己的信匣。條件未到只是一個空信匣;條件到了(見 stores/finale.js)
// 依玩家的選擇狀態切換:抉擇點 → 結局 A / 結局 B。
const finale = useFinaleStore()

const stage = computed(() => {
  if (!finale.evidenceReady) return 'empty'
  if (finale.choice === 'expose') return 'expose'
  if (finale.choice === 'silence') return 'silence'
  return 'choice'
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

  <FinaleChoice v-else-if="stage === 'choice'" />
  <FinaleEndingExpose v-else-if="stage === 'expose'" />
  <FinaleEndingSilence v-else />
</template>
