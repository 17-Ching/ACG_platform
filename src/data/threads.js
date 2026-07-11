// 文章資料註冊表。頁面用 /thread/:id 從這裡查,查不到就顯示 in-world 的不存在頁。
// 「掛不掛在看板/列表上」決定一篇文是公開還是隱藏——隱藏文一樣註冊在這裡,
// 只是不出現在任何列表,得靠線索知道編號。
//
// 文字內容一律照 docs/design/ 對應設計文件原文,不改寫、不擴寫。

import { storyNow, oldPostDates, fmtMDY, fmtMD } from './anchors.js'

// 懸賞主文(docs/design/懸賞_關卡1與2_懸賞主文與起疑.md)
// 發文日 = 故事當下 00:00(總表:懸賞文發文日)
const bounty = {
  id: '101', // 公開文章編號,登錄於總表「隱藏頁/特殊路由一覽」
  board: '都市傳說',
  pinned: true,
  author: 'k_r_o_w',
  title: '[懸賞] 我藏了東西。找到的人,錢是你的。',
  time: `${fmtMDY(storyNow)} 00:00`,
  content: [
    '規則很簡單:跟著線索走就好。',
    '',
    '第一關免費送你:回到我開始的地方。',
    '那裡有人替我留了話,只是沒人看得懂。',
    '',
    '找對了,你就知道下一步。找到最後,',
    '你會知道一個很有頭有臉的人,不想讓你知道的事。',
    '',
    '懸賞金:夠你不用再上班。',
    '真的。到帳那天你就信了。',
    '',
    '—— 別問我是誰。你遲早會查到。',
  ].join('\n'),
  pushes: [
    { type: 'push', user: 'rich_hunter', text: '又一個釣魚文 zzz', time: fmtMD(storyNow) },
    { type: 'push', user: 'rich_hunter', text: '不過懸賞金多少先講', time: fmtMD(storyNow) },
    { type: 'push', user: 'momo_2', text: 'k_r_o_w?這 ID 我好像有印象欸', time: fmtMD(storyNow) },
    { type: 'push', user: 'KKcat', text: '……這個帳號我認識。他不是會開這種玩笑的人。', time: fmtMD(storyNow) },
    { type: 'push', user: 'KKcat', text: '而且他兩年沒上線了。', time: fmtMD(storyNow) },
    { type: 'push', user: '路人', text: '樓上認真的?起雞皮疙瘩', time: fmtMD(storyNow) },
    { type: 'push', user: 'abc999', text: '反正閒著,我玩玩看。回到我開始的地方是三小', time: fmtMD(storyNow) },
    { type: 'push', user: 'momo_2', text: '他自己最早的文?點他 ID 看發文紀錄啊', time: fmtMD(storyNow) },
  ],
}

// 舊文①(docs/design/懸賞_舊文文本與密碼設計.md PART 1)
// k_r_o_w 最早的貼文,由發文紀錄頁最底進入
const oldPost1 = {
  id: '23', // 登錄於總表「隱藏頁/特殊路由一覽」
  board: '心情',
  author: 'k_r_o_w',
  title: '[心情] 有人半夜也睡不著的嗎',
  time: `${fmtMDY(oldPostDates.p1)} 03:47`,
  content: [
    '不想回去。',
    '在超商坐到店員一直看我。',
    '如果有個地方可以不用回家就好了。',
    '反正也沒人發現我不在。',
    '',
    '—— 手機發文,排版亂請見諒',
  ].join('\n'),
  pushes: [
    { type: 'push', user: '路人甲', text: '生活好無聊,路過推一下', time: fmtMD(oldPostDates.p1) },
    { type: 'push', user: 'abc123', text: '日出了還在爬文,我也是醉了 zzz', time: fmtMD(oldPostDates.p1) },
    { type: 'push', user: '小明', text: '就這?沒圖沒真相 XD', time: fmtMD(oldPostDates.p1) },
    { type: 'push', user: '夜貓', text: '是在哈囉,這板怎麼這麼冷', time: fmtMD(oldPostDates.p1) },
    { type: 'push', user: '匿名', text: '密的啦,樓主加油(隨手推)', time: fmtMD(oldPostDates.p1) },
    { type: 'push', user: '過客', text: '碼的,怎麼都沒人正經回你,同情推', time: fmtMD(oldPostDates.p1) },
  ],
}

export const pinnedThread = bounty

export const threads = {
  [bounty.id]: bounty,
  [oldPost1.id]: oldPost1,
}
