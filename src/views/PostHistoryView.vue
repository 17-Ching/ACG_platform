<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { postHistory } from '../data/postHistory.js'
import { fmtYMD } from '../data/anchors.js'

const route = useRoute()
const posts = computed(() => postHistory[route.params.id])

// 相鄰兩篇相隔超過 600 天就插入一段「空白斷層」區塊
const GAP_DAYS = 600
const rows = computed(() => {
  const out = []
  ;(posts.value ?? []).forEach((post, i) => {
    if (i > 0) {
      const prev = posts.value[i - 1]
      const days = (prev.date - post.date) / 86400000
      if (days > GAP_DAYS) out.push({ gap: true })
    }
    out.push(post)
  })
  return out
})
</script>

<template>
  <div v-if="posts" class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
      ┌ 發文紀錄 ─ {{ route.params.id }}
      <span class="text-bbs-dim">(由新到舊)</span>
    </div>

    <div class="px-3 py-2">
      <template v-for="(row, i) in rows" :key="i">
        <!-- 空白斷層 -->
        <div
          v-if="row.gap"
          class="my-2 border-y border-dashed border-bbs-border py-10 text-center text-bbs-dim"
        >
          (中間空白兩年,沒有任何發文)
        </div>

        <!-- 可點的文章列 -->
        <RouterLink
          v-else-if="row.threadId"
          :to="`/thread/${row.threadId}`"
          class="flex gap-3 py-0.5 hover:bg-bbs-sel hover:text-bbs-bright"
        >
          <span class="shrink-0 text-bbs-dim">·</span>
          <span class="flex-1 truncate text-bbs-link">{{ row.title }}</span>
          <span class="shrink-0 text-bbs-dim">{{ fmtYMD(row.date) }}</span>
        </RouterLink>

        <!-- 純列表項 -->
        <div v-else class="flex gap-3 py-0.5">
          <span class="shrink-0 text-bbs-dim">·</span>
          <span class="flex-1 truncate">{{ row.title }}</span>
          <span class="shrink-0 text-bbs-dim">{{ fmtYMD(row.date) }}</span>
        </div>
      </template>
    </div>
  </div>

  <div v-else class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>查無發文紀錄。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>
</template>
