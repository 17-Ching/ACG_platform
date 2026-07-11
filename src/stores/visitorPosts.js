import { ref } from 'vue'
import { defineStore } from 'pinia'
import { storyNow, fmtMD } from '../data/anchors.js'

export const VISITOR_ID = 'ghost_5566'

// 訪客在文章串留下的推文。純前端 state,重新整理即消失——
// 刻意不寫 localStorage、不打 API,留言只活在這一次瀏覽裡。
// isVisitor 旗標用來和劇情原生推文區分(資料層與視覺都分得開)。
export const useVisitorPostsStore = defineStore('visitorPosts', () => {
  const byThread = ref({})

  function pushesFor(threadId) {
    return byThread.value[threadId] ?? []
  }

  function addPush(threadId, text) {
    const trimmed = String(text ?? '').trim()
    if (!trimmed) return
    const clock = new Date()
    const hhmm = `${String(clock.getHours()).padStart(2, '0')}:${String(clock.getMinutes()).padStart(2, '0')}`
    ;(byThread.value[threadId] ??= []).push({
      type: 'push',
      user: VISITOR_ID,
      text: trimmed,
      time: `${fmtMD(storyNow)} ${hhmm}`,
      isVisitor: true,
    })
  }

  return { byThread, pushesFor, addPush }
})
