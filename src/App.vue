<script setup>
import SiteFooter from './components/SiteFooter.vue'
import { useFinaleStore } from './stores/finale.js'
import { VISITOR_ID } from './stores/visitorPosts.js'

const finale = useFinaleStore()
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
  </div>
</template>
