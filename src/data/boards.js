// 首頁看板列表。目前看板本身還沒有文章列表頁(之後需要再加 to 欄位變成可點)。
// 板名與板旨為氣氛用的中性內容,不含線索。

export const boards = [
  { id: 'sysop', category: '站務', name: '站務公告', moderator: 'SYSOP', popularity: 4, title: '公告與站規' },
  { id: 'chat', category: '閒聊', name: '灌水閒聊', moderator: '(無)', popularity: 58, title: '想到什麼說什麼' },
  { id: 'marvel', category: '靈異', name: '都市傳說', moderator: '(無)', popularity: 31, title: '真的假的,自己判斷' },
  { id: 'test', category: '測試', name: '測試板', moderator: '(無)', popularity: 2, title: '發文測試請來這' },
]
