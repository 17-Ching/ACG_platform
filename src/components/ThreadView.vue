<script setup>
defineProps({
  thread: { type: Object, required: true },
})

// 推文三種型態的字首與顏色,做成一眼可辨:推=綠、噓=紅、→=黃
const pushMark = {
  push: { symbol: '推', class: 'text-bbs-push' },
  boo: { symbol: '噓', class: 'text-bbs-boo' },
  arrow: { symbol: '→', class: 'text-bbs-warn' },
}
</script>

<template>
  <article class="border border-bbs-border bg-bbs-panel">
    <!-- 文章表頭 -->
    <header class="border-b border-bbs-border px-3 py-2">
      <div>
        <span class="text-bbs-dim">作者</span>
        <span class="ml-2 text-bbs-bright">{{ thread.author }}</span>
        <span v-if="thread.nickname" class="text-bbs-dim">({{ thread.nickname }})</span>
        <span class="float-right text-bbs-dim">看板 <span class="text-bbs-accent">{{ thread.board }}</span></span>
      </div>
      <div>
        <span class="text-bbs-dim">標題</span>
        <span class="ml-2 text-bbs-warn">{{ thread.title }}</span>
      </div>
      <div>
        <span class="text-bbs-dim">時間</span>
        <span class="ml-2">{{ thread.time }}</span>
      </div>
    </header>

    <!-- 主文 -->
    <div class="whitespace-pre-wrap break-words px-3 py-3">{{ thread.content }}</div>

    <!-- 推文列表 -->
    <footer v-if="thread.pushes?.length" class="border-t border-bbs-border px-3 py-2">
      <div v-for="(push, i) in thread.pushes" :key="i" class="flex gap-2">
        <span :class="pushMark[push.type].class">{{ pushMark[push.type].symbol }}</span>
        <span class="text-bbs-accent">{{ push.user }}</span>
        <span class="text-bbs-dim">:</span>
        <span class="flex-1 break-words">{{ push.text }}</span>
        <span class="shrink-0 text-bbs-dim">{{ push.time }}</span>
      </div>
    </footer>
  </article>
</template>
