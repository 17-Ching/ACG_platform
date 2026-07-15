<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import { useFinaleStore } from './stores/finale.js'
import { VISITOR_ID } from './stores/visitorPosts.js'

const router = useRouter()
const finale = useFinaleStore()

// 未讀數增加的當下跳彈窗(重新整理不重跳,站頭閃爍當備援)
const showMailModal = ref(false)
watch(
  () => finale.newMailCount,
  (now, before) => {
    if (now > before) showMailModal.value = true
  },
)

function openMail() {
  showMailModal.value = false
  if (finale.newMailCount === 2) finale.openLetters()
  router.push(`/user/${VISITOR_ID}/mail`)
}
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-3xl flex-col px-3 py-4 sm:px-6">
    <header class="mb-4 border-b border-bbs-border pb-2">
      <RouterLink to="/" class="text-bbs-accent hover:text-bbs-bright">
        ▌夜燈站<span class="text-bbs-dim"> Yodeng BBS</span>
      </RouterLink>
      <span class="float-right hidden text-bbs-dim sm:inline">telnet://yodeng…</span>
      <!-- 收件匣:有未讀時變成閃爍的新訊息通知,點開即消 -->
      <RouterLink
        :to="`/user/${VISITOR_ID}/mail`"
        class="float-right sm:mr-4"
        :class="
          finale.newMailCount
            ? 'animate-pulse text-bbs-warn hover:text-bbs-bright'
            : 'text-bbs-dim hover:text-bbs-bright'
        "
        @click="finale.newMailCount === 2 && finale.openLetters()"
      >{{ finale.newMailCount ? `[新訊息 ${finale.newMailCount}]` : '[收件匣 0]' }}</RouterLink>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <SiteFooter />

    <!-- 新訊息彈窗 -->
    <div
      v-if="showMailModal && finale.newMailCount"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div class="w-full max-w-sm border border-bbs-accent bg-bbs-panel text-center">
        <div class="border-b border-bbs-border px-3 py-1 text-left text-bbs-accent">┌ 系統通知</div>
        <p class="animate-pulse px-3 py-6 text-bbs-warn">▌你有 {{ finale.newMailCount }} 封新訊息</p>
        <div class="flex justify-center gap-6 border-t border-bbs-border px-3 py-2">
          <button type="button" class="text-bbs-link hover:text-bbs-bright" @click="openMail">
            [開啟信匣]
          </button>
          <button type="button" class="text-bbs-dim hover:text-bbs-bright" @click="showMailModal = false">
            [稍後]
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
