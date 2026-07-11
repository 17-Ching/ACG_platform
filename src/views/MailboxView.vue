<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MessageThread from '../components/MessageThread.vue'
import { mailboxes } from '../data/messages.js'
import { MAILBOX_PASSCODE, MAIL_REVEAL_SECONDS } from '../data/anchors.js'
import { useProgressStore } from '../stores/progress.js'

const route = useRoute()
const progress = useProgressStore()

const mailbox = computed(() => mailboxes[route.params.id])
const solvedKey = computed(() => `mail:${route.params.id}`)
const unlocked = computed(() => progress.isSolved(solvedKey.value))

// ── 通行碼閘門 ──
const code = ref('')
const rejected = ref(false)

function tryUnlock() {
  if (code.value.trim() === MAILBOX_PASSCODE) {
    rejected.value = false
    progress.markSolved(solvedKey.value)
  } else {
    rejected.value = true
    code.value = ''
  }
}

// ── 對話顯示(最底那則延遲淡入)──
const shown = ref([])
let timer = null

function startReveal() {
  const box = mailbox.value
  if (!box) return
  shown.value = [...box.messages]
  clearTimeout(timer)
  if (box.delayed) {
    timer = setTimeout(() => {
      shown.value = [...shown.value, box.delayed]
    }, MAIL_REVEAL_SECONDS * 1000)
  }
}

onMounted(() => {
  if (unlocked.value) startReveal()
})
watch(unlocked, (now) => {
  if (now) startReveal()
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div v-if="!mailbox" class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>查無此人,或對方不公開名片。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>

  <!-- 通行碼閘門 -->
  <div v-else-if="!unlocked" class="border border-bbs-border bg-bbs-panel px-3 py-8 text-center">
    <p class="text-bbs-accent">┌ 站內信匣 ─ {{ route.params.id }}</p>
    <p class="mt-4">這個信匣上了鎖。</p>
    <form class="mt-4 flex items-baseline justify-center gap-2" @submit.prevent="tryUnlock">
      <label class="text-bbs-dim" for="mail-code">通行碼</label>
      <input
        id="mail-code"
        v-model="code"
        maxlength="4"
        inputmode="numeric"
        autocomplete="off"
        class="w-20 border-b border-bbs-border bg-transparent text-center tracking-widest text-bbs-bright outline-none focus:border-bbs-accent"
      />
      <button type="submit" class="text-bbs-link hover:text-bbs-bright">[開啟]</button>
    </form>
    <p v-if="rejected" class="mt-4 text-bbs-boo">密碼錯誤。……你真的認識我嗎?</p>
  </div>

  <!-- 對話 -->
  <MessageThread v-else :messages="shown" />
</template>
