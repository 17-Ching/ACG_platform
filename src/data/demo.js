// 外殼預覽用的佔位假資料。不含任何劇情、密碼或線索;
// 正式內容之後依 docs/design/ 逐關建立,放在 src/data/ 底下獨立檔案。

export const demoBoards = [
  { id: 'sysop', category: '站務', name: '站務公告', moderator: 'SYSOP', popularity: 12, title: '站規與公告' },
  { id: 'chat', category: '閒聊', name: '灌水閒聊', moderator: 'user001', popularity: 87, title: '想到什麼說什麼' },
  { id: 'test', category: '測試', name: '測試板', moderator: '(無)', popularity: 3, title: '發文測試請來這' },
  { id: 'lost', category: '其他', name: '失物招領', moderator: 'user002', popularity: 0, title: '(本板已停用)' },
]

export const demoThread = {
  board: 'test',
  author: 'user001',
  nickname: '測試中',
  title: '[測試] 這是一篇測試文',
  time: '07/01/2006 23:14',
  content: [
    '這是主文的第一段,用來確認排版。',
    '',
    '空一行之後是第二段。等寬字下中英夾雜 test 123 的對齊效果,',
    '以及比較長的一行會不會正確折行,像這樣一直寫一直寫一直寫下去。',
  ].join('\n'),
  pushes: [
    { type: 'push', user: 'user003', text: '推排版', time: '07/01 23:20' },
    { type: 'push', user: 'user004', text: '樓上好快', time: '07/01 23:21' },
    { type: 'boo', user: 'user005', text: '測試文也要噓', time: '07/01 23:25' },
    { type: 'arrow', user: 'user003', text: '補充:換行正常', time: '07/02 00:02' },
  ],
}

export const demoProfile = {
  id: 'user001',
  nickname: '測試中',
  registeredAt: '2004/03/15',
  postCount: 152,
  birthday: '01/01',
  lastLogin: '2006/07/01 23:30',
  signature: ['-- ', '這裡是簽名檔,兩行以內。', '     (,,・ω・,,)'].join('\n'),
}

export const demoMessages = [
  { id: 1, from: 'user002', time: '06/28 21:07', content: '在嗎?想問你上次說的那件事。', read: true },
  { id: 2, from: 'user001', fromMe: true, time: '06/28 21:12', content: '在,你說。', read: true },
  { id: 3, from: 'user002', time: '06/28 21:15', content: '沒事,我再想想,想好再跟你說。', read: true },
  { id: 4, from: 'user002', time: '07/01 02:41', content: '睡了嗎?', read: false },
]
