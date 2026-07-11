<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { postHistory } from '../data/postHistory.js'
import { fmtYMD } from '../data/anchors.js'

const route = useRoute()
const posts = computed(() => postHistory[route.params.id])
</script>

<template>
  <div v-if="posts" class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
      ┌ 發文紀錄 ─ {{ route.params.id }}
      <span class="text-bbs-dim">(由新到舊)</span>
    </div>

    <div class="px-3 py-2">
      <RouterLink
        v-for="post in posts"
        :key="post.threadId"
        :to="`/thread/${post.threadId}`"
        class="flex gap-3 py-0.5 hover:bg-bbs-sel hover:text-bbs-bright"
      >
        <span class="shrink-0 text-bbs-dim">·</span>
        <span class="flex-1 truncate text-bbs-link">{{ post.title }}</span>
        <span class="shrink-0 text-bbs-dim">{{ fmtYMD(post.date) }}</span>
      </RouterLink>
    </div>
  </div>

  <div v-else class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>查無發文紀錄。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>
</template>
