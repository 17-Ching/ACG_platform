<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ThreadView from '../components/ThreadView.vue'
import NotFoundView from './NotFoundView.vue'
import { threads } from '../data/threads.js'
import { profiles } from '../data/profiles.js'
import { useVisitorPostsStore, VISITOR_ID } from '../stores/visitorPosts.js'

const route = useRoute()
const thread = computed(() => threads[route.params.id])
const linkedIds = Object.keys(profiles)

const visitorPosts = useVisitorPostsStore()
const visitorPushes = computed(() => visitorPosts.pushesFor(route.params.id))
</script>

<template>
  <ThreadView
    v-if="thread"
    :thread="thread"
    :linked-ids="linkedIds"
    :visitor-pushes="visitorPushes"
    :visitor-id="VISITOR_ID"
    @submit-push="visitorPosts.addPush(route.params.id, $event)"
  />
  <NotFoundView v-else />
</template>
