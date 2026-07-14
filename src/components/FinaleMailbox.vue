<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import MessageThread from './MessageThread.vue'
import {
  krowCoordMail,
  krowCoordReply,
  coordRejectText,
  matchesBurialLat,
  burialLon,
  kkcatLetter,
  justiceLetter,
} from '../data/finale.js'
import { useFinaleStore } from '../stores/finale.js'

const finale = useFinaleStore()

// 一句一句傳:回覆 → 照片,依序直接出現(無淡入)。重訪用短節奏。
// 照片出現的那一拍才記 photoSeen,站頭「新訊息 2」隨之亮起。
const beat = ref(0)
let timers = []
function runBeats(times) {
  timers.forEach(clearTimeout)
  beat.value = 0
  timers = times.map((ms, i) =>
    setTimeout(() => {
      beat.value = i + 1
      if (i === 1) finale.markPhotoSeen()
    }, ms),
  )
}

onMounted(() => {
  // 打開信匣 = 點開了 k_r_o_w 的新訊息,站頭通知即消
  finale.markMailSeen()
  if (finale.coordsSolved) runBeats([200, 600])
})
onUnmounted(() => timers.forEach(clearTimeout))

// ── 座標輸入 ──
const coordInput = ref('')
const rejected = ref(false)

function submitCoords() {
  if (matchesBurialLat(coordInput.value)) {
    rejected.value = false
    finale.solveCoords()
    runBeats([1200, 3200])
  } else {
    rejected.value = true
  }
}

const krowMessages = computed(() => {
  const list = [{ id: 'coord-ask', ...krowCoordMail }]
  if (finale.coordsSolved && beat.value >= 1) {
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
      <form
        class="flex flex-wrap items-baseline justify-center gap-2"
        @submit.prevent="submitCoords"
      >
        <label class="shrink-0 text-bbs-dim" for="coord-input">座標</label>
        <input
          id="coord-input"
          v-model="coordInput"
          maxlength="10"
          autocomplete="off"
          spellcheck="false"
          placeholder="緯度"
          class="w-28 border-b border-bbs-border bg-transparent text-center tracking-wide text-bbs-bright outline-none placeholder:text-bbs-dim focus:border-bbs-accent"
          @input="rejected = false"
        />
        <span class="shrink-0 text-bbs-dim">, {{ burialLon }}</span>
        <button type="submit" class="shrink-0 text-bbs-link hover:text-bbs-bright">[送出]</button>
      </form>
      <p v-if="rejected" class="mt-3 text-bbs-boo">{{ coordRejectText }}</p>
    </div>

    <!-- 附檔照片 -->
    <Transition name="fade">
      <div
        v-if="finale.coordsSolved && beat >= 2"
        class="border border-bbs-border bg-bbs-panel"
      >
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
