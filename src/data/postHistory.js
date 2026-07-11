// 發文紀錄(由新到舊)。有 threadId 的可點進 /thread/:id,沒有的只是列表項。
// 共 17 篇 = 個資頁「發文總數」(anchors.KROW_POST_COUNT),數字對齊總表。
//
// 標了 filler 的是湊滿篇數用的無劇情灌水文:設計文件沒有定義這些標題,
// 內容刻意選論壇機能/天氣類的中性話題,不承載任何線索,可整批替換。

import { storyNow, oldPostDates } from './anchors.js'

const d = (y, m, day) => new Date(y, m - 1, day)

export const postHistory = {
  k_r_o_w: [
    { threadId: '101', title: '[懸賞] 我藏了東西。找到的人,錢是你的。', date: storyNow },
    { title: '(無標題)', date: oldPostDates.p5 },
    { title: '[心情] 認識了一個網友 好像終於有人要理我了', date: oldPostDates.p4 },
    { title: '[問題] 圖片上傳一直失敗', date: d(2014, 8, 12), filler: true },
    { title: '[閒聊] 天氣好熱 廢文一篇', date: d(2014, 7, 30), filler: true },
    { title: '[問題] 這板的精華區在哪', date: d(2014, 7, 18), filler: true },
    { title: '[閒聊] 隨便測試一下簽名檔', date: d(2014, 6, 25), filler: true },
    { title: '[閒聊] 世足有人在看嗎', date: d(2014, 6, 14), filler: true },
    { title: '[問題] 推文的快捷鍵是哪個', date: d(2014, 6, 2), filler: true },
    { title: '[問題] 暱稱可以改幾次', date: d(2014, 5, 11), filler: true },
    { title: '[閒聊] 連假結束 廢文', date: d(2014, 4, 27), filler: true },
    { title: '[問題] 版面顏色可以自訂嗎', date: d(2014, 4, 6), filler: true },
    { title: '[閒聊] 午餐吃什麼好', date: d(2014, 3, 25), filler: true },
    { title: '[閒聊] 沒事 灌個水', date: d(2014, 3, 18), filler: true },
    { title: '[閒聊] 今天生日', date: oldPostDates.p3 },
    { title: '[問卦] 你們家晚上會很安靜嗎', date: oldPostDates.p2 },
    { threadId: '23', title: '[心情] 有人半夜也睡不著的嗎', date: oldPostDates.p1 },
  ],
}
