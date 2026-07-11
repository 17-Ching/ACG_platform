<script setup>
defineProps({
  messages: { type: Array, required: true },
})
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">┌ 站內信</div>

    <TransitionGroup tag="div" name="msg" class="flex flex-col gap-1 px-3 py-2">
      <!-- 已讀:暗字 ○;未讀:紅字 ● + 紅色左框。沒有 read 欄位的訊息不顯示狀態 -->
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="border-l-2 py-1 pl-3"
        :class="msg.read === false ? 'border-bbs-boo' : 'border-bbs-border'"
      >
        <div class="flex gap-2">
          <span :class="msg.own ? 'text-bbs-warn' : 'text-bbs-accent'">{{ msg.from }}</span>
          <span class="ml-auto shrink-0 text-bbs-dim">{{ msg.time }}</span>
        </div>
        <div class="whitespace-pre-wrap break-words">{{ msg.content }}</div>
        <div v-if="msg.read === true" class="text-right text-bbs-dim">○ 已讀</div>
        <div v-else-if="msg.read === false" class="text-right text-bbs-boo">● 未讀</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* 新訊息淡入 */
.msg-enter-active {
  transition: opacity 2.5s ease;
}
.msg-enter-from {
  opacity: 0;
}
</style>
