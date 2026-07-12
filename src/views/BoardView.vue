<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { boards } from '../data/boards.js'
import { threads } from '../data/threads.js'
import { fmtMD } from '../data/anchors.js'

const route = useRoute()
const board = computed(() => boards.find((b) => b.id === route.params.id))

// 該板文章:從註冊表依板名撈,置頂旗標優先,其餘新到舊
const list = computed(() =>
  board.value
    ? Object.values(threads)
        .filter((thread) => thread.board === board.value.name)
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date - a.date)
    : [],
)
</script>

<template>
  <div v-if="board" class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
      ┌ 看板 ─ {{ board.name }}
      <span class="text-bbs-dim">{{ board.title }}</span>
    </div>

    <div class="px-3 py-2">
      <RouterLink
        v-for="thread in list"
        :key="thread.id"
        :to="`/thread/${thread.id}`"
        class="flex gap-3 py-0.5 hover:bg-bbs-sel hover:text-bbs-bright"
      >
        <span class="shrink-0 text-bbs-dim">·</span>
        <span class="flex-1 truncate" :class="thread.locked ? 'text-bbs-warn' : 'text-bbs-link'">
          {{ thread.locked ? '🔒 ' : '' }}{{ thread.title }}
        </span>
        <span class="hidden w-24 truncate text-bbs-dim sm:block">{{ thread.author }}</span>
        <span class="shrink-0 text-bbs-dim">{{ fmtMD(thread.date) }}</span>
      </RouterLink>
      <p v-if="!list.length" class="py-4 text-center text-bbs-dim">(本板還沒有文章)</p>
    </div>
  </div>

  <div v-else class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>沒有這個看板。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>
</template>
