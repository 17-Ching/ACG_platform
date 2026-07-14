import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useProgressStore } from './progress.js'
import { DOSSIER_THREAD, BACKUP_THREAD } from '../data/anchors.js'

const STORAGE_KEY = 'bbs-finale'

// 終局觸發:三道關(站內信匣、八卦板上鎖文章、shan_0829 上鎖文)都開過,才算東西到手。
const REQUIRED_KEYS = ['mail:k_r_o_w', `unlock:${DOSSIER_THREAD}`, `unlock:${BACKUP_THREAD}`]

// 終局信匣的進度 key(存在 progress store)
const SEEN_KROW_KEY = 'seen:krow-mail' // 點開過 k_r_o_w 的新訊息
const COORDS_KEY = 'coords:burial' // 座標答對
const LETTERS_KEY = 'letters:open' // 點開過「新訊息 (2)」,信匣刷新成兩封信

// 兩個結局的代號:expose = 公開證據,silence = 刪除證據收下錢
const CHOICES = ['expose', 'silence']

// 玩家的最終選擇。存 localStorage,重新整理不掉;可回到抉擇點重選。
export const useFinaleStore = defineStore('finale', () => {
  const progress = useProgressStore()
  const choice = ref(loadChoice())

  watch(choice, (val) => {
    if (val) localStorage.setItem(STORAGE_KEY, val)
    else localStorage.removeItem(STORAGE_KEY)
  })

  const evidenceReady = computed(() => REQUIRED_KEYS.every((key) => progress.isSolved(key)))

  const coordsSolved = computed(() => progress.isSolved(COORDS_KEY))
  const lettersOpened = computed(() => progress.isSolved(LETTERS_KEY))

  // 站頭收件匣的未讀數:0 = 收件匣、1 = k_r_o_w 的信、2 = 兩封新信
  const newMailCount = computed(() => {
    if (!evidenceReady.value || choice.value) return 0
    if (!progress.isSolved(SEEN_KROW_KEY)) return 1
    if (coordsSolved.value && !lettersOpened.value) return 2
    return 0
  })

  function markMailSeen() {
    progress.markSolved(SEEN_KROW_KEY)
  }

  function solveCoords() {
    progress.markSolved(COORDS_KEY)
  }

  function openLetters() {
    progress.markSolved(LETTERS_KEY)
  }

  function choose(id) {
    if (CHOICES.includes(id)) choice.value = id
  }

  function rechoose() {
    choice.value = null
  }

  return {
    choice,
    evidenceReady,
    coordsSolved,
    lettersOpened,
    newMailCount,
    markMailSeen,
    solveCoords,
    openLetters,
    choose,
    rechoose,
  }
})

function loadChoice() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return CHOICES.includes(raw) ? raw : null
  } catch {
    return null
  }
}
