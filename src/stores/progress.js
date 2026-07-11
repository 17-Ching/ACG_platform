import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'bbs-progress'

// 玩家進度:只記「解開了哪些關卡 id」,關卡 id 之後依設計文件命名。
// 存 localStorage,重新整理不掉進度。
export const useProgressStore = defineStore('progress', () => {
  const solved = ref(loadSolved())

  watch(
    solved,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true },
  )

  function markSolved(id) {
    if (!solved.value.includes(id)) solved.value.push(id)
  }

  function isSolved(id) {
    return solved.value.includes(id)
  }

  function reset() {
    solved.value = []
  }

  return { solved, markSolved, isSolved, reset }
})

function loadSolved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
