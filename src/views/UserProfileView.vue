<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProfileCard from '../components/ProfileCard.vue'
import { profiles } from '../data/profiles.js'

const route = useRoute()
const profile = computed(() => profiles[route.params.id])
</script>

<template>
  <ProfileCard v-if="profile" :profile="profile" />
  <div v-else class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center">
    <p>查無此人,或對方不公開名片。</p>
    <RouterLink to="/" class="mt-2 inline-block text-bbs-link hover:text-bbs-bright">
      [回到首頁]
    </RouterLink>
  </div>
</template>
