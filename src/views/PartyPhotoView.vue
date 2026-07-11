<script setup>
import { computed, ref } from 'vue'
import darkSrc from '../assets/party_dark.webp'
import brightSrc from '../assets/party_bright.webp'
import { PHOTO_TAKEN_AT, PHOTO_GPS } from '../data/anchors.js'

// 亮度 0–100:暗版先用 CSS brightness 拉亮,過中段後亮版漸顯
const level = ref(0)
const darkStyle = computed(() => ({
  filter: `brightness(${(1 + (level.value / 100) * 1.6).toFixed(2)})`,
}))
const brightOpacity = computed(() => Math.min(1, Math.max(0, (level.value - 45) / 55)))

const showInfo = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="border border-bbs-border bg-bbs-panel">
      <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
        ┌ 相片檢視 ─ party_0xx.jpg
        <RouterLink to="/user/k_r_o_w/mail" class="float-right text-bbs-dim hover:text-bbs-bright">
          [回站內信]
        </RouterLink>
      </div>

      <!-- 照片:暗版墊底,亮版隨亮度浮現 -->
      <div class="relative">
        <img :src="darkSrc" :style="darkStyle" alt="party_0xx.jpg" class="block w-full select-none" />
        <img
          :src="brightSrc"
          :style="{ opacity: brightOpacity }"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 block h-full w-full select-none"
        />
      </div>

      <!-- 亮度控制 -->
      <div class="flex items-center gap-3 border-t border-bbs-border px-3 py-2">
        <span class="text-bbs-dim">亮度</span>
        <input
          v-model.number="level"
          type="range"
          min="0"
          max="100"
          class="min-w-0 flex-1 accent-bbs-accent"
        />
        <button
          class="shrink-0 text-bbs-link hover:text-bbs-bright"
          @click="showInfo = !showInfo"
        >[相片資訊]</button>
      </div>

      <!-- 相片資訊(模擬的檔案詳細資訊面板) -->
      <dl v-if="showInfo" class="grid grid-cols-[6rem_1fr] gap-x-2 border-t border-dashed border-bbs-border px-3 py-2">
        <dt class="text-bbs-dim">檔案名稱</dt>
        <dd>party_0xx.jpg</dd>
        <dt class="text-bbs-dim">拍攝時間</dt>
        <dd>{{ PHOTO_TAKEN_AT }}</dd>
        <dt class="text-bbs-dim">GPS 座標</dt>
        <dd>{{ PHOTO_GPS }}</dd>
        <dt class="text-bbs-dim">拍攝裝置</dt>
        <dd class="text-bbs-dim">(未知)</dd>
      </dl>
    </div>
  </div>
</template>
