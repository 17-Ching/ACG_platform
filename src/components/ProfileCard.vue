<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: { type: Object, required: true },
})

// 名片欄位可缺漏:空殼帳號只登記 ID,有值的欄位才渲染
const rows = computed(() =>
  [
    ['註冊日期', props.profile.registeredAt],
    ['發文總數', props.profile.postCount],
    ['生日', props.profile.birthday],
    ['最後上線', props.profile.lastLogin],
  ].filter(([, value]) => value != null),
)
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
      ┌ 使用者名片 ─ {{ profile.id }}
      <span v-if="profile.nickname" class="text-bbs-dim">({{ profile.nickname }})</span>
    </div>

    <dl v-if="rows.length" class="grid grid-cols-[6rem_1fr] gap-x-2 px-3 py-2">
      <template v-for="[label, value] in rows" :key="label">
        <dt class="text-bbs-dim">{{ label }}</dt>
        <dd>{{ value }}</dd>
      </template>
    </dl>
    <div v-else class="px-3 py-2 text-bbs-dim">(對方不公開名片資料)</div>

    <div v-if="profile.signature" class="border-t border-dashed border-bbs-border px-3 py-2">
      <div class="text-bbs-dim">簽名檔:</div>
      <pre class="whitespace-pre-wrap font-mono text-bbs-dim">{{ profile.signature }}</pre>
    </div>
  </div>
</template>
