<script setup>
defineProps({
  messages: { type: Array, required: true },
})
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">┌ 站內信</div>

    <div class="flex flex-col gap-1 px-3 py-2">
      <!-- 未讀:亮字 + 青色左框 + ● 未讀;已讀:暗字 + ○ 已讀 -->
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="border-l-2 py-1 pl-3"
        :class="msg.read ? 'border-bbs-border text-bbs-dim' : 'border-bbs-accent bg-bbs-sel text-bbs-bright'"
      >
        <div class="flex gap-2">
          <span :class="msg.read ? 'text-bbs-dim' : 'text-bbs-accent'">
            {{ msg.read ? '○ 已讀' : '● 未讀' }}
          </span>
          <span :class="msg.fromMe ? 'text-bbs-warn' : 'text-bbs-accent'">
            {{ msg.fromMe ? '我 → ' : '' }}{{ msg.from }}
          </span>
          <span class="ml-auto shrink-0">{{ msg.time }}</span>
        </div>
        <div class="whitespace-pre-wrap break-words" :class="msg.read ? '' : 'text-bbs-fg'">
          {{ msg.content }}
        </div>
      </div>
    </div>
  </div>
</template>
