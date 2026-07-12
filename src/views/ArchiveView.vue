<script setup>
import { computed, ref } from 'vue'
import { threads } from '../data/threads.js'
import { ARCHIVE_QUERY_CODE } from '../data/anchors.js'
import { useProgressStore } from '../stores/progress.js'
import reportScan from '../assets/report.webp'

const progress = useProgressStore()
const unlocked = computed(() => progress.isSolved('archive:report'))

// 查詢碼三段輸入,格式同結案截圖的塗黑殘影(4-4-3)
const seg1 = ref('')
const seg2 = ref('')
const seg3 = ref('')
const rejected = ref(false)

function tryQuery() {
  const attempt = [seg1, seg2, seg3].map((s) => s.value.trim()).join('-')
  if (attempt === ARCHIVE_QUERY_CODE) {
    rejected.value = false
    progress.markSolved('archive:report')
  } else {
    rejected.value = true
    seg1.value = ''
    seg2.value = ''
    seg3.value = ''
  }
}

// 報告圖檢視:點圖放大,細節(塗黑露邊)看得清
const zoomed = ref(false)

const bounty = threads['101']
const bountyLastLine = bounty.content.split('\n').at(-1)
</script>

<template>
  <!-- 查詢閘門 -->
  <div
    v-if="!unlocked"
    class="border border-bbs-border bg-bbs-panel px-3 py-8 text-center"
  >
    <p class="text-bbs-accent">┌ 卷宗調閱 ─ 內部查詢系統</p>
    <p class="mt-4 text-bbs-dim">限承辦人員使用。</p>
    <form class="mt-6 flex items-baseline justify-center gap-1" @submit.prevent="tryQuery">
      <label class="mr-2 text-bbs-dim" for="archive-seg-1">查詢碼</label>
      <input
        id="archive-seg-1"
        v-model="seg1"
        maxlength="4"
        inputmode="numeric"
        autocomplete="off"
        class="w-16 border-b border-bbs-border bg-transparent text-center tracking-widest text-bbs-bright outline-none focus:border-bbs-accent"
      />
      <span class="text-bbs-dim">-</span>
      <input
        v-model="seg2"
        maxlength="4"
        inputmode="numeric"
        autocomplete="off"
        aria-label="查詢碼第二段"
        class="w-16 border-b border-bbs-border bg-transparent text-center tracking-widest text-bbs-bright outline-none focus:border-bbs-accent"
      />
      <span class="text-bbs-dim">-</span>
      <input
        v-model="seg3"
        maxlength="3"
        inputmode="numeric"
        autocomplete="off"
        aria-label="查詢碼第三段"
        class="w-12 border-b border-bbs-border bg-transparent text-center tracking-widest text-bbs-bright outline-none focus:border-bbs-accent"
      />
      <button type="submit" class="ml-2 text-bbs-link hover:text-bbs-bright">[調閱]</button>
    </form>
    <p v-if="rejected" class="mt-4 text-bbs-boo">
      查無此卷宗。……有些東西本來就不該被你看到。
    </p>
  </div>

  <!-- 封存報告(現成掃描圖,不疊字) -->
  <div v-else class="border border-bbs-border bg-bbs-panel">
    <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
      ┌ 卷宗調閱 ─ 附件(已封存)
      <span class="float-right text-bbs-dim">(點圖可放大)</span>
    </div>
    <div class="overflow-auto px-3 py-3" :class="zoomed ? 'max-h-[80vh]' : ''">
      <img
        :src="reportScan"
        alt="現場採證暨檢驗報告(節本)掃描件"
        class="mx-auto"
        :class="zoomed ? 'w-[180%] max-w-none cursor-zoom-out' : 'max-w-full cursor-zoom-in'"
        @click="zoomed = !zoomed"
      />
    </div>

    <!-- 文末引用:整塊可點,回懸賞主文 -->
    <RouterLink
      :to="`/thread/${bounty.id}`"
      class="mx-3 mb-3 block border border-dashed border-bbs-border px-3 py-2 hover:bg-bbs-sel hover:text-bbs-bright"
    >
      <div class="text-bbs-dim">※ 引述【{{ bounty.title }}】</div>
      <div class="whitespace-pre-wrap">{{ bountyLastLine }}</div>
    </RouterLink>
  </div>
</template>
