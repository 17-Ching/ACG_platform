<script setup>
import { computed, onMounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import {
  krowCoordMail,
  krowCoordReply,
  coordRejectText,
  matchesBurialCoords,
  kkcatLetter,
  justiceLetter,
} from '../data/finale.js'
import { useFinaleStore } from '../stores/finale.js'

const finale = useFinaleStore()

onMounted(() => {
  // 打開信匣 = 點開了 k_r_o_w 的新訊息,站頭通知即消
  finale.markMailSeen()
  // 座標已解的重訪:照片就在畫面上,補記顯示狀態
  if (finale.coordsSolved) finale.markPhotoSeen()
})

// ── 座標輸入 ──
const coordInput = ref('')
const rejected = ref(false)

function submitCoords() {
  if (matchesBurialCoords(coordInput.value)) {
    rejected.value = false
    finale.solveCoords()
    // 回覆與照片直接出現;照片顯示後站頭才亮「新訊息 2」
    finale.markPhotoSeen()
  } else {
    rejected.value = true
  }
}

const krowMessages = computed(() => {
  const list = [{ id: 'coord-ask', ...krowCoordMail }]
  if (finale.coordsSolved) {
    list.push({
      id: 'coord-reply',
      from: krowCoordReply.from,
      time: krowCoordReply.time,
      content: krowCoordReply.content,
    })
  }
  return list
})

const letters = [kkcatLetter, justiceLetter]
const zoomed = ref(false)
</script>

<template>
  <!-- 兩封新信:點開站頭「新訊息 2」後的信匣,只剩這兩封,只能回其中一封 -->
  <div v-if="finale.lettersOpened" class="flex flex-col gap-3">
    <div
      v-for="letter in letters"
      :key="letter.id"
      class="border border-bbs-border bg-bbs-panel"
    >
      <div class="border-b border-bbs-border px-3 py-1">
        <span class="text-bbs-accent">┌ 新訊息 ─ </span>
        <RouterLink
          :to="`/user/${letter.from}`"
          class="text-bbs-bright hover:underline"
        >{{ letter.from }}</RouterLink>
        <span class="float-right text-bbs-dim">{{ letter.time }}</span>
      </div>
      <div class="whitespace-pre-wrap break-words px-3 py-3">{{ letter.content }}</div>
      <div class="border-t border-bbs-border px-3 py-2 text-right">
        <button
          type="button"
          class="text-bbs-link hover:text-bbs-bright"
          @click="finale.choose(letter.id === 'letter-kkcat' ? 'expose' : 'silence')"
        >[回信]</button>
      </div>
    </div>
  </div>

  <!-- 座標信 → 回覆與照片(之後由站頭「新訊息 2」通知接手) -->
  <div v-else class="flex flex-col gap-3">
    <MessageThread :messages="krowMessages" />

    <!-- 座標輸入 -->
    <div
      v-if="!finale.coordsSolved"
      class="border border-bbs-border bg-bbs-panel px-3 py-4 text-center"
    >
      <form class="flex items-baseline justify-center gap-2" @submit.prevent="submitCoords">
        <label class="shrink-0 text-bbs-dim" for="coord-input">座標</label>
        <input
          id="coord-input"
          v-model="coordInput"
          maxlength="30"
          autocomplete="off"
          spellcheck="false"
          placeholder="緯度, 經度"
          class="w-64 max-w-full border-b border-bbs-border bg-transparent text-center tracking-wide text-bbs-bright outline-none placeholder:text-bbs-dim focus:border-bbs-accent"
          @input="rejected = false"
        />
        <button type="submit" class="shrink-0 text-bbs-link hover:text-bbs-bright">[送出]</button>
      </form>
      <p v-if="rejected" class="mt-3 text-bbs-boo">{{ coordRejectText }}</p>
    </div>

    <!-- 附檔照片(image 為空時渲染佔位框,補圖後自動改渲染圖檔) -->
    <div v-if="finale.coordsSolved" class="border border-bbs-border bg-bbs-panel">
      <div class="border-b border-bbs-border px-3 py-1 text-bbs-dim">
        {{ krowCoordReply.photo.caption }}
      </div>
      <div class="overflow-auto px-3 py-3" :class="zoomed ? 'max-h-[80vh]' : ''">
        <img
          v-if="krowCoordReply.photo.image"
          :src="krowCoordReply.photo.image"
          :alt="krowCoordReply.photo.alt"
          class="mx-auto"
          :class="zoomed ? 'w-[180%] max-w-none cursor-zoom-out' : 'max-w-full cursor-zoom-in'"
          @click="zoomed = !zoomed"
        />
        <div v-else class="flex aspect-[4/3] items-center justify-center bg-black text-bbs-dim">
          (相片)
        </div>
      </div>
    </div>
  </div>
</template>
