<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import {
  krowCoordMail,
  krowCoordReply,
  coordRejectText,
  matchesBurialCoords,
  kkcatLetter,
  justiceLetter,
} from '../data/finale.js'
import { useProgressStore } from '../stores/progress.js'
import { useFinaleStore } from '../stores/finale.js'

const COORDS_KEY = 'coords:burial'
const progress = useProgressStore()
const finale = useFinaleStore()

const coordsSolved = computed(() => progress.isSolved(COORDS_KEY))

// 逐段浮現:回覆 → 照片 → 兩封新信。已解過(重訪/回到抉擇點)用短節奏
const beat = ref(0)
let timers = []
function runBeats(times) {
  timers.forEach(clearTimeout)
  timers = times.map((ms, i) => setTimeout(() => (beat.value = i + 1), ms))
}
onMounted(() => {
  if (coordsSolved.value) runBeats([300, 900, 1800])
})
onUnmounted(() => timers.forEach(clearTimeout))

// ── 座標輸入 ──
const coordInput = ref('')
const rejected = ref(false)

function submitCoords() {
  if (matchesBurialCoords(coordInput.value)) {
    rejected.value = false
    progress.markSolved(COORDS_KEY)
    runBeats([1500, 3500, 7500])
  } else {
    rejected.value = true
  }
}

const krowMessages = computed(() => {
  const list = [{ id: 'coord-ask', ...krowCoordMail }]
  if (coordsSolved.value && beat.value >= 1) {
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
  <div class="flex flex-col gap-3">
    <MessageThread :messages="krowMessages" />

    <!-- 座標輸入 -->
    <div
      v-if="!coordsSolved"
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
    <Transition name="fade">
      <div v-if="coordsSolved && beat >= 2" class="border border-bbs-border bg-bbs-panel">
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
    </Transition>

    <!-- 兩封新信:只能回其中一封 -->
    <Transition name="fade">
      <div v-if="coordsSolved && beat >= 3" class="flex flex-col gap-3">
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
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 2s ease;
}
.fade-enter-from {
  opacity: 0;
}
</style>
