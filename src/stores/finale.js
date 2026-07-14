import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useProgressStore } from './progress.js'
import { DOSSIER_THREAD, BACKUP_THREAD } from '../data/anchors.js'

const STORAGE_KEY = 'bbs-finale'

// 終局觸發:三道關(站內信匣、八卦板上鎖文章、shan_0829 上鎖文)都開過,才算東西到手。
const REQUIRED_KEYS = ['mail:k_r_o_w', `unlock:${DOSSIER_THREAD}`, `unlock:${BACKUP_THREAD}`]

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

  function choose(id) {
    if (CHOICES.includes(id)) choice.value = id
  }

  function rechoose() {
    choice.value = null
  }

  return { choice, evidenceReady, choose, rechoose }
})

function loadChoice() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return CHOICES.includes(raw) ? raw : null
  } catch {
    return null
  }
}
