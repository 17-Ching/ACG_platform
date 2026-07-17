<script setup>
import { onMounted, onUnmounted } from 'vue'
import { entry } from '../data/entry.js'

const emit = defineEmits(['enter'])

function onKeydown() {
  emit('enter')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-bbs-bg px-4"
    @click="emit('enter')"
  >
    <div class="w-full max-w-sm border border-bbs-border bg-bbs-panel px-4 py-6 text-center">
      <p class="text-bbs-accent">{{ entry.title }}</p>
      <p class="text-bbs-dim">{{ entry.host }}</p>

      <div class="mt-4 text-bbs-dim">
        <p>系統時間:{{ entry.systemTime }}</p>
        <p>{{ entry.online }}</p>
      </div>

      <div class="mt-4">
        <p v-for="line in entry.loginLines" :key="line">{{ line }}</p>
      </div>

      <div class="mt-4 text-left text-bbs-warn">
        <p v-for="(line, i) in entry.notice" :key="i" class="min-h-[1.25rem]">{{ line }}</p>
      </div>

      <p class="mt-6 animate-pulse text-bbs-link">{{ entry.enterHint }}</p>

      <p class="mt-6 border-t border-bbs-border pt-2 text-xs text-bbs-dim">
        {{ entry.disclaimer }}
      </p>
    </div>
  </div>
</template>
