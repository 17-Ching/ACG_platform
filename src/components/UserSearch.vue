<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { lookupUser } from '../data/userDirectory.js'

const router = useRouter()
const query = ref('')
const missed = ref(false)

function search() {
  const id = lookupUser(query.value)
  if (id) {
    missed.value = false
    query.value = ''
    router.push(`/user/${id}`)
  } else {
    missed.value = true
  }
}
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">┌ 使用者查詢</div>
    <form class="flex items-baseline gap-2 px-3 py-2" @submit.prevent="search">
      <label class="shrink-0 text-bbs-dim" for="user-query">帳號 ID</label>
      <input
        id="user-query"
        v-model="query"
        maxlength="20"
        autocomplete="off"
        spellcheck="false"
        placeholder="輸入帳號 ID 查詢"
        class="min-w-0 flex-1 border-b border-bbs-border bg-transparent text-bbs-fg outline-none placeholder:text-bbs-dim focus:border-bbs-accent"
        @input="missed = false"
      />
      <button type="submit" class="shrink-0 text-bbs-link hover:text-bbs-bright">[查詢]</button>
    </form>
    <p v-if="missed" class="px-3 pb-2 text-bbs-dim">查無此使用者。這裡的人,來來去去。</p>
  </div>
</template>
