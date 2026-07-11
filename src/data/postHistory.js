// 發文紀錄:直接從文章註冊表推導(該作者的所有文章,由新到舊),
// 不另外維護一份列表,篇數自然等於個資頁「發文總數」。

import { threads } from './threads.js'

function historyOf(author) {
  return Object.values(threads)
    .filter((thread) => thread.author === author)
    .sort((a, b) => b.date - a.date)
    .map((thread) => ({ threadId: thread.id, title: thread.title, date: thread.date }))
}

export const postHistory = {
  k_r_o_w: historyOf('k_r_o_w'),
}
