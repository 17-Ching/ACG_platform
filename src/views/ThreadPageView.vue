<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ThreadView from "../components/ThreadView.vue";
import { threads } from "../data/threads.js";
import { profiles } from "../data/profiles.js";
import { useVisitorPostsStore, VISITOR_ID } from "../stores/visitorPosts.js";
import { useProgressStore } from "../stores/progress.js";

const route = useRoute();
const thread = computed(() => threads[route.params.id]);
const linkedIds = Object.keys(profiles);

const visitorPosts = useVisitorPostsStore();
const visitorPushes = computed(() => visitorPosts.pushesFor(route.params.id));

// 上鎖文章:thread.locked = { code, hint?, wrongText? } 時需輸入解鎖碼,解鎖狀態存進度。
// 解鎖碼可帶 - 分段(例 4-4-3),閘門依段數各開一格輸入框。
const progress = useProgressStore();
const isLocked = computed(
  () =>
    Boolean(thread.value?.locked) &&
    !progress.isSolved(`unlock:${thread.value.id}`),
);
const segments = computed(() =>
  thread.value?.locked ? thread.value.locked.code.split("-") : [],
);
const parts = ref([]);
watch(segments, (segs) => (parts.value = segs.map(() => "")), {
  immediate: true,
});
const rejected = ref(false);

function tryUnlock() {
  const attempt = parts.value.map((p) => p.trim()).join("-");
  if (attempt === thread.value.locked.code) {
    rejected.value = false;
    progress.markSolved(`unlock:${thread.value.id}`);
  } else {
    rejected.value = true;
    parts.value = segments.value.map(() => "");
  }
}
</script>

<template>
  <!-- 上鎖畫面 -->
  <div
    v-if="thread && isLocked"
    class="border border-bbs-border bg-bbs-panel px-3 py-8 text-center"
  >
    <p class="text-bbs-warn">🔒 {{ thread.title }}</p>
    <p class="mt-1 text-bbs-dim">{{ thread.author }} · {{ thread.time }}</p>
    <p class="mt-4">
      本文已上鎖。<span class="text-bbs-dim"
        >(作者提示:{{ thread.locked.hint ?? "鑰匙就是檔名" }})</span
      >
    </p>
    <form
      class="mt-4 flex items-baseline justify-center gap-1"
      @submit.prevent="tryUnlock"
    >
      <label class="mr-1 text-bbs-dim" for="unlock-code-0">解鎖碼</label>
      <template v-for="(seg, i) in segments" :key="i">
        <span v-if="i > 0" class="text-bbs-dim">-</span>
        <input
          :id="`unlock-code-${i}`"
          v-model="parts[i]"
          :maxlength="seg.length"
          :style="{ width: `${seg.length + 2}ch` }"
          inputmode="numeric"
          autocomplete="off"
          class="border-b border-bbs-border bg-transparent text-center tracking-widest text-bbs-bright outline-none focus:border-bbs-accent"
        />
      </template>
      <button type="submit" class="ml-1 text-bbs-link hover:text-bbs-bright">
        [解鎖]
      </button>
    </form>
    <p v-if="rejected" class="mt-4 text-bbs-boo">
      {{ thread.locked.wrongText ?? "錯了。鑰匙不是用猜的。" }}
    </p>
  </div>

  <ThreadView
    v-else-if="thread"
    :thread="thread"
    :linked-ids="linkedIds"
    :visitor-pushes="visitorPushes"
    :visitor-id="VISITOR_ID"
    @submit-push="visitorPosts.addPush(route.params.id, $event)"
  />

  <div
    v-else
    class="border border-bbs-border bg-bbs-panel px-3 py-6 text-center"
  >
    <p>文章不存在。……還是你根本不想找到?</p>
    <RouterLink
      to="/"
      class="mt-2 inline-block text-bbs-link hover:text-bbs-bright"
    >
      [回到首頁]
    </RouterLink>
  </div>
</template>
