// 首頁看板列表。有 to 欄位的看板可點進 /board/:id 文章列表;
// 看板頁的文章由 threads 註冊表依 thread.board === name 自動撈出(新到舊)。
// 新增看板:加一筆並給 to,再到 boardPosts.js 補幾篇該板的文即可。

export const boards = [
  { id: 'missing', name: '協尋', category: '服務', moderator: '(無)', popularity: 26, title: '尋人尋物,互相幫忙', to: '/board/missing' },
  { id: 'gossip', name: '八卦', category: '綜合', moderator: '(無)', popularity: 84, title: '有掛快爆,沒掛去隔壁', to: '/board/gossip' },
  { id: 'marvel', name: '飄版', category: '靈異', moderator: '(無)', popularity: 47, title: '信不信由你', to: '/board/marvel' },
  { id: 'chat', name: '閒聊', category: '休閒', moderator: '(無)', popularity: 58, title: '想到什麼說什麼', to: '/board/chat' },
  { id: 'movie', name: '電影', category: '影劇', moderator: '(無)', popularity: 39, title: '雷文請標題註明', to: '/board/movie' },
  { id: 'politics', name: '政治', category: '議題', moderator: '(無)', popularity: 51, title: '對事不對人', to: '/board/politics' },
  { id: 'webgirl', name: 'Web女孩', category: '生活', moderator: '(無)', popularity: 33, title: '女孩們的取暖天地', to: '/board/webgirl' },
  { id: 'marginal', name: 'Marginalman', category: '生活', moderator: '(無)', popularity: 18, title: '邊緣人互相取暖', to: '/board/marginal' },
  { id: 'sysop', name: '站務公告', category: '站務', moderator: 'SYSOP', popularity: 4, title: '公告與站規', to: '/board/sysop' },
  { id: 'test', name: '測試板', category: '測試', moderator: '(無)', popularity: 2, title: '發文測試請來這', to: '/board/test' },
]
