<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ThreadView from '../components/ThreadView.vue'
import NotFoundView from './NotFoundView.vue'
import { threads } from '../data/threads.js'
import { profiles } from '../data/profiles.js'

const route = useRoute()
const thread = computed(() => threads[route.params.id])
const linkedIds = Object.keys(profiles)
</script>

<template>
  <ThreadView v-if="thread" :thread="thread" :linked-ids="linkedIds" />
  <NotFoundView v-else />
</template>
