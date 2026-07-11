<script setup>
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="mx-auto flex min-h-screen max-w-3xl flex-col px-3 py-4 sm:px-6">
    <header class="mb-4 border-b border-bbs-border pb-2">
      <RouterLink to="/" class="text-bbs-accent hover:text-bbs-bright">
        ▌未命名小站<span class="text-bbs-dim">(站名暫定)</span>
      </RouterLink>
      <span class="float-right text-bbs-dim">telnet://…</span>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>
