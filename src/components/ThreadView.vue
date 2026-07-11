<script setup>
const props = defineProps({
  thread: { type: Object, required: true },
  // 出現在內文/推文文字中要變成可點連結的使用者 ID(通常傳 profiles 註冊表的 key)
  linkedIds: { type: Array, default: () => [] },
})

// 推文三種型態的字首與顏色,做成一眼可辨:推=綠、噓=紅、→=黃
const pushMark = {
  push: { symbol: '推', class: 'text-bbs-push' },
  boo: { symbol: '噓', class: 'text-bbs-boo' },
  arrow: { symbol: '→', class: 'text-bbs-warn' },
}

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// 把文字切成「一般文字」與「可點 ID」的片段
function segments(text) {
  if (!props.linkedIds.length || !text) return [{ text }]
  const re = new RegExp(`(${props.linkedIds.map(escapeRegExp).join('|')})`, 'g')
  return text
    .split(re)
    .filter(Boolean)
    .map((part) => (props.linkedIds.includes(part) ? { id: part } : { text: part }))
}
</script>

<template>
  <article class="border border-bbs-border bg-bbs-panel">
    <!-- 文章表頭 -->
    <header class="border-b border-bbs-border px-3 py-2">
      <div>
        <span class="text-bbs-dim">作者</span>
        <RouterLink
          :to="`/user/${thread.author}`"
          class="ml-2 text-bbs-bright hover:underline"
        >{{ thread.author }}</RouterLink>
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

    <!-- 主文(pre-wrap 容器,標記全部寫在同一行以免多出空白) -->
    <div class="whitespace-pre-wrap break-words px-3 py-3"><template v-for="(seg, i) in segments(thread.content)" :key="i"><RouterLink v-if="seg.id" :to="`/user/${seg.id}`" class="text-bbs-link hover:underline">{{ seg.id }}</RouterLink><span v-else>{{ seg.text }}</span></template></div>

    <!-- 推文列表 -->
    <footer v-if="thread.pushes?.length" class="border-t border-bbs-border px-3 py-2">
      <div v-for="(push, i) in thread.pushes" :key="i" class="flex gap-2">
        <span :class="pushMark[push.type].class">{{ pushMark[push.type].symbol }}</span>
        <RouterLink :to="`/user/${push.user}`" class="text-bbs-accent hover:underline">{{ push.user }}</RouterLink>
        <span class="text-bbs-dim">:</span>
        <span class="flex-1 break-words"><template v-for="(seg, j) in segments(push.text)" :key="j"><RouterLink v-if="seg.id" :to="`/user/${seg.id}`" class="text-bbs-link hover:underline">{{ seg.id }}</RouterLink><span v-else>{{ seg.text }}</span></template></span>
        <span class="shrink-0 text-bbs-dim">{{ push.time }}</span>
      </div>
    </footer>
  </article>
</template>
