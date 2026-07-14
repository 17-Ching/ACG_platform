<script setup>
defineProps({
  messages: { type: Array, required: true },
})
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">┌ 站內信</div>

    <div class="flex flex-col gap-1 px-3 py-2">
      <!-- 讀取狀態:已讀=暗字 ○(帶讀取日期);未讀=紅字 ● + 紅色左框。
           沒有 read 欄位的訊息(信匣主人發出的那側)不顯示狀態 -->
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
        <div class="whitespace-pre-wrap break-words">
          <RouterLink
            v-if="msg.link"
            :to="msg.link"
            class="text-bbs-link underline hover:text-bbs-bright"
          >{{ msg.content }}</RouterLink>
          <template v-else>{{ msg.content }}</template>
        </div>
        <div v-if="msg.read === true" class="text-right text-bbs-dim">
          ○ 已讀{{ msg.readAt ? ` ${msg.readAt}` : '' }}
        </div>
        <div v-else-if="msg.read === false" class="text-right text-bbs-boo">● 未讀</div>
      </div>
    </div>
  </div>
</template>
