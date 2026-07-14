<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileCard from '../components/ProfileCard.vue'
import { profiles } from '../data/profiles.js'
import { postHistory } from '../data/postHistory.js'
import { mailboxes } from '../data/messages.js'
import { threads } from '../data/threads.js'
import { fmtYMD } from '../data/anchors.js'

const route = useRoute()
const profile = computed(() => profiles[route.params.id])
const hasPosts = computed(() => Boolean(postHistory[route.params.id]))
const hasMail = computed(() => Boolean(mailboxes[route.params.id]))

// 未公開文章:該作者標了 unlisted 的文(不掛看板,只在帳號頁露出)
const unlistedPosts = computed(() =>
  Object.values(threads)
    .filter((thread) => thread.author === route.params.id && thread.unlisted)
    .sort((a, b) => b.date - a.date),
)
</script>

<template>
  <div v-if="profile">
    <ProfileCard :profile="profile" />
    <div class="mt-2 flex gap-4">
      <RouterLink
        v-if="hasPosts"
        :to="`/user/${profile.id}/posts`"
        class="text-bbs-link hover:text-bbs-bright"
      >[發文紀錄]</RouterLink>
      <RouterLink
        v-if="hasMail"
        :to="`/user/${profile.id}/mail`"
        class="text-bbs-link hover:text-bbs-bright"
      >[站內信匣]</RouterLink>
    </div>

    <div v-if="unlistedPosts.length" class="mt-2 border border-bbs-border bg-bbs-panel">
      <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">┌ 未公開文章</div>
      <RouterLink
        v-for="thread in unlistedPosts"
        :key="thread.id"
        :to="`/thread/${thread.id}`"
        class="flex gap-3 px-3 py-1 hover:bg-bbs-sel hover:text-bbs-bright"
      >
        <span class="flex-1 truncate" :class="thread.locked ? 'text-bbs-warn' : 'text-bbs-link'">
          {{ thread.locked ? '🔒 ' : '' }}{{ thread.title }}
        </span>
        <span class="shrink-0 text-bbs-dim">{{ fmtYMD(thread.date) }}</span>
      </RouterLink>
    </div>
  </div>

  <div v-else class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>查無此人,或對方不公開名片。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>
</template>
