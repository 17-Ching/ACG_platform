<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileCard from '../components/ProfileCard.vue'
import { profiles } from '../data/profiles.js'
import { postHistory } from '../data/postHistory.js'
import { mailboxes } from '../data/messages.js'

const route = useRoute()
const profile = computed(() => profiles[route.params.id])
const hasPosts = computed(() => Boolean(postHistory[route.params.id]))
const hasMail = computed(() => Boolean(mailboxes[route.params.id]))
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
  </div>

  <div v-else class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>查無此人,或對方不公開名片。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>
</template>
