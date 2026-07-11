<script setup>
import BoardList from '../components/BoardList.vue'
import { boards } from '../data/boards.js'
import { pinnedThread } from '../data/threads.js'
import { today, fmtMD } from '../data/anchors.js'
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- 置頂文 -->
    <RouterLink
      :to="`/thread/${pinnedThread.id}`"
      class="block border border-bbs-border bg-bbs-panel px-3 py-2 hover:bg-bbs-sel"
    >
      <span class="text-bbs-boo">[置頂]</span>
      <span class="ml-1 text-bbs-warn">{{ pinnedThread.title }}</span>
      <span class="mt-1 block text-bbs-dim sm:float-right sm:mt-0 sm:inline">
        {{ pinnedThread.author }} · {{ fmtMD(today) }}
      </span>
    </RouterLink>

    <BoardList :boards="boards" />
  </div>
</template>
