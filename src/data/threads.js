// 文章資料註冊表。頁面用 /thread/:id 從這裡查,查不到就顯示 in-world 的不存在頁。
// 「掛不掛在看板/列表上」決定一篇文是公開還是隱藏——隱藏文一樣註冊在這裡,
// 只是不出現在任何列表,得靠線索知道編號。
//
// 文字內容一律照 docs/design/ 對應設計文件原文,不改寫、不擴寫。

import { today, fmtMDY, fmtMD } from './anchors.js'

// 懸賞主文(docs/design/懸賞_關卡1與2_懸賞主文與起疑.md)
// 發文日 = 動態「今天」00:00(總表:懸賞文發文日)
const bounty = {
  id: '101', // 公開文章編號,已登錄於總表「隱藏頁/特殊路由一覽」
  board: '都市傳說',
  pinned: true,
  author: 'k_r_o_w',
  title: '[懸賞] 我藏了東西。找到的人,錢是你的。',
  time: `${fmtMDY(today)} 00:00`,
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
    { type: 'push', user: 'rich_hunter', text: '又一個釣魚文 zzz', time: fmtMD(today) },
    { type: 'push', user: 'rich_hunter', text: '不過懸賞金多少先講', time: fmtMD(today) },
    { type: 'push', user: 'momo_2', text: 'k_r_o_w?這 ID 我好像有印象欸', time: fmtMD(today) },
    { type: 'push', user: 'KKcat', text: '……這個帳號我認識。他不是會開這種玩笑的人。', time: fmtMD(today) },
    { type: 'push', user: 'KKcat', text: '而且他兩年沒上線了。', time: fmtMD(today) },
    { type: 'push', user: '路人', text: '樓上認真的?起雞皮疙瘩', time: fmtMD(today) },
    { type: 'push', user: 'abc999', text: '反正閒著,我玩玩看。回到我開始的地方是三小', time: fmtMD(today) },
    { type: 'push', user: 'momo_2', text: '他自己最早的文?點他 ID 看發文紀錄啊', time: fmtMD(today) },
  ],
}

export const pinnedThread = bounty

export const threads = {
  [bounty.id]: bounty,
}
