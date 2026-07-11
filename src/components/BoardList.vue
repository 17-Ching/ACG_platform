<script setup>
defineProps({
  boards: { type: Array, required: true },
})

defineEmits(['select'])
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="flex gap-2 border-b border-bbs-border px-3 py-1 text-bbs-dim">
      <span class="w-8 text-right">編號</span>
      <span class="w-12">類別</span>
      <span class="w-24">板名</span>
      <span class="w-10 text-right">人氣</span>
      <span class="flex-1">板旨</span>
      <span class="hidden w-16 sm:block">板主</span>
    </div>

    <button
      v-for="(board, i) in boards"
      :key="board.id"
      class="flex w-full gap-2 px-3 py-1 text-left hover:bg-bbs-sel hover:text-bbs-bright"
      @click="$emit('select', board)"
    >
      <span class="w-8 text-right text-bbs-dim">{{ i + 1 }}</span>
      <span class="w-12 text-bbs-warn">{{ board.category }}</span>
      <span class="w-24 text-bbs-accent">{{ board.name }}</span>
      <span class="w-10 text-right" :class="board.popularity > 50 ? 'text-bbs-bright' : 'text-bbs-dim'">
        {{ board.popularity }}
      </span>
      <span class="flex-1 truncate">{{ board.title }}</span>
      <span class="hidden w-16 truncate text-bbs-dim sm:block">{{ board.moderator }}</span>
    </button>
  </div>
</template>
