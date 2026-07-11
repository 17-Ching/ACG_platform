<script setup>
defineProps({
  profile: { type: Object, required: true },
})
</script>

<template>
  <div class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
      ┌ 使用者名片 ─ {{ profile.id }}
      <span v-if="profile.nickname" class="text-bbs-dim">({{ profile.nickname }})</span>
    </div>

    <dl class="grid grid-cols-[6rem_1fr] gap-x-2 px-3 py-2">
      <dt class="text-bbs-dim">註冊日</dt>
      <dd>{{ profile.registeredAt }}</dd>
      <dt class="text-bbs-dim">發文數</dt>
      <dd>{{ profile.postCount }} 篇</dd>
      <dt class="text-bbs-dim">生日</dt>
      <dd>{{ profile.birthday }}</dd>
      <dt class="text-bbs-dim">最後上線</dt>
      <dd>{{ profile.lastLogin }}</dd>
    </dl>

    <div v-if="profile.signature" class="border-t border-dashed border-bbs-border px-3 py-2">
      <div class="text-bbs-dim">簽名檔:</div>
      <pre class="whitespace-pre-wrap font-mono text-bbs-dim">{{ profile.signature }}</pre>
    </div>
  </div>
</template>
