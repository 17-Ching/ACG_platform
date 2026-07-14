// k_r_o_w 的 16 篇舊文(2014)。
// 舊文①~⑤ 文字照 docs/design/懸賞_舊文文本與密碼設計.md 原文,不改寫。
// 其餘 11 篇標 filler:設計文件未定義,為湊滿發文總數 17 篇(anchors.KROW_POST_COUNT)
// 而寫的深夜心情短文,不承載線索,可整批替換。
// 文章編號依時間遞增、留自然空號;日期對應總表「舊文與站內信日期」。

import { oldPostDates, fmtMDY, fmtMD } from './anchors.js'

const AUTHOR = 'k_r_o_w'
const d = (m, day) => new Date(2014, m - 1, day)
const stamp = (date, clock) => `${fmtMDY(date)} ${clock}`
// 推文時間戳:同日的某個時刻
const pushAt = (date, clock) => `${fmtMD(date)} ${clock}`

export const oldPosts = [
  // ── 舊文①(最早貼文)──
  {
    id: '23',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 有人半夜也睡不著的嗎',
    date: oldPostDates.p1,
    time: stamp(oldPostDates.p1, '03:47'),
    content: [
      '不想回去。',
      '在超商坐到店員一直看我。',
      '如果有個地方可以不用回家就好了。',
      '反正也沒人發現我不在。',
      '',
      '—— 手機發文,排版亂請見諒',
    ].join('\n'),
    pushes: [
      { type: 'push', user: '路人甲', text: '生活好無聊,路過推一下', time: pushAt(oldPostDates.p1, '04:02') },
      { type: 'push', user: 'abc123', text: '日出了還在爬文,我也是醉了 zzz', time: pushAt(oldPostDates.p1, '04:15') },
      { type: 'push', user: '小明', text: '就這?沒圖沒真相 XD', time: pushAt(oldPostDates.p1, '04:31') },
      { type: 'push', user: '夜貓', text: '是在哈囉,這板怎麼這麼冷', time: pushAt(oldPostDates.p1, '04:56') },
      { type: 'push', user: '匿名', text: '密的啦,樓主加油(隨手推)', time: pushAt(oldPostDates.p1, '05:10') },
      { type: 'push', user: '過客', text: '碼的,怎麼都沒人正經回你,同情推', time: pushAt(oldPostDates.p1, '06:03') },
    ],
  },

  // ── 舊文② ──
  {
    id: '26',
    board: '問卦',
    author: AUTHOR,
    title: '[問卦] 你們家晚上會很安靜嗎',
    date: oldPostDates.p2,
    time: stamp(oldPostDates.p2, '01:12'),
    content: [
      '我家一到晚上就很吵,但我更怕安靜下來的時候。',
      '門關起來假裝在睡,其實在數幾點天會亮。',
      '算了,沒事,發廢文而已。',
    ].join('\n'),
    pushes: [
      { type: 'push', user: 'KKcat', text: '??發生什麼事了嗎', time: pushAt(oldPostDates.p2, '01:25') },
      { type: 'push', user: 'k_r_o_w', text: '沒事啦 想太多', time: pushAt(oldPostDates.p2, '01:31') },
    ],
  },

  // ── 舊文③ ──
  {
    id: '29',
    board: '閒聊',
    author: AUTHOR,
    title: '[閒聊] 今天生日',
    date: oldPostDates.p3,
    time: stamp(oldPostDates.p3, '22:52'),
    content: [
      '自己買了顆蛋糕。便利商店那種小小的。',
      '本來想說會不會有人記得,結果手機一整天很安靜。',
      '沒關係,我幫自己唱了。',
    ].join('\n'),
    pushes: [],
  },

  // ── 填充舊文(由舊到新)──
  {
    id: '32',
    board: '閒聊',
    author: AUTHOR,
    title: '[閒聊] 超商的關東煮換了',
    date: d(3, 18),
    time: stamp(d(3, 18), '23:26'),
    content: [
      '蘿蔔變小塊了,湯的味道倒是沒變。',
      '店員換了個新來的,不會一直看我了。',
      '可以繼續坐。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '35',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 沒什麼 就是想發個文',
    date: d(3, 25),
    time: stamp(d(3, 25), '22:14'),
    content: [
      '今天被同學問假日都在幹嘛。',
      '想了很久,不知道怎麼回。',
      '好像也沒有人真的想聽答案。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '39',
    board: '問卦',
    author: AUTHOR,
    title: '[問卦] 半夜的公園都是誰在用',
    date: d(4, 6),
    time: stamp(d(4, 6), '02:36'),
    content: [
      '兩點的公園比想像中熱鬧。',
      '有人遛狗,有人講電話,講得很兇。',
      '大家都有不想回去的理由吧。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '44',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 連假結束了',
    date: d(4, 27),
    time: stamp(d(4, 27), '00:58'),
    content: [
      '大家都在哀連假結束。',
      '我還好。放假就是整天都得待在同一個地方,',
      '還是有學校好一點,至少出門有個說法。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '48',
    board: '閒聊',
    author: AUTHOR,
    title: '[閒聊] 今天外面人好多',
    date: d(5, 11),
    time: stamp(d(5, 11), '21:38'),
    content: [
      '原來是母親節,餐廳門口都在排隊。',
      '我買了個麵包,在公園坐到人變少。',
      '沒事,就記錄一下。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '53',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 用走的回去',
    date: d(6, 2),
    time: stamp(d(6, 2), '23:52'),
    content: [
      '今天沒搭車,用走的,繞了兩條街。',
      '到巷口的時候看燈還亮著,',
      '就又去超商坐了一下。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '57',
    board: '閒聊',
    author: AUTHOR,
    title: '[閒聊] 世足 有人在看嗎',
    date: d(6, 14),
    time: stamp(d(6, 14), '03:21'),
    content: [
      '全世界都在熬夜看球。',
      '我也醒著,不過沒在看,就是睡不著。',
      '想說發個文,搞不好有人也醒著。',
    ].join('\n'),
    filler: true,
    pushes: [
      { type: 'push', user: '球迷99', text: '世足文去專板發啦', time: pushAt(d(6, 14), '03:29') },
    ],
  },
  {
    id: '61',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 存錢',
    date: d(6, 25),
    time: stamp(d(6, 25), '01:05'),
    content: [
      '算了一下,再存半年應該就夠了。',
      '夠做什麼還沒想好。',
      '先存著,總有一天用得到。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '66',
    board: '問卦',
    author: AUTHOR,
    title: '[問卦] 有人暑假都自己一個人的嗎',
    date: d(7, 18),
    time: stamp(d(7, 18), '02:12'),
    content: [
      '放假第三個禮拜,好像還沒跟人講到話。',
      '超商店員問我發票要不要捐,那句算嗎。',
    ].join('\n'),
    filler: true,
    pushes: [
      { type: 'push', user: '路人丙', text: '邊緣人給推 XD', time: pushAt(d(7, 18), '02:40') },
    ],
  },
  {
    id: '70',
    board: '閒聊',
    author: AUTHOR,
    title: '[閒聊] 頂樓的風很大',
    date: d(7, 30),
    time: stamp(d(7, 30), '00:37'),
    content: [
      '今天在頂樓待到十二點。',
      '上面收訊不好,反而安靜。',
      '要是能在上面搭帳篷住就好了。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },
  {
    id: '75',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 耳機壞了一邊',
    date: d(8, 12),
    time: stamp(d(8, 12), '01:44'),
    content: [
      '右耳沒聲音了。',
      '想說壞就壞吧,反正也沒什麼好聽的。',
      '只是沒聲音的時候,就會聽到別的。',
      '算了。',
    ].join('\n'),
    filler: true,
    pushes: [],
  },

  // ── 舊文④ ──
  {
    id: '77',
    board: '心情',
    author: AUTHOR,
    title: '[心情] 認識了一個網友 好像終於有人要理我了',
    date: oldPostDates.p4,
    time: stamp(oldPostDates.p4, '22:31'),
    content: [
      '網路上認識一個人,人超好,一直找我聊天。',
      '他說週末有個很屌的趴,是某個「有錢有勢的大少爺」辦的,',
      '問我要不要去,說去了就懂什麼叫人生。',
      '我猶豫了一下……但好久沒人這樣約我了。',
      '有點期待。',
    ].join('\n'),
    pushes: [
      { type: 'push', user: 'KKcat', text: '陌生網友的邀約要小心欸', time: pushAt(oldPostDates.p4, '22:47') },
      { type: 'push', user: 'KKcat', text: '真的假的 地址在哪 我不太放心', time: pushAt(oldPostDates.p4, '23:02') },
    ],
  },

  // ── 舊文⑤ ──
  {
    id: '78',
    board: '心情',
    author: AUTHOR,
    title: '(無標題)',
    date: oldPostDates.p5,
    time: stamp(oldPostDates.p5, '19:03'),
    content: [
      '如果我之後都沒上線,',
      '幫我跟 KKcat 說聲謝謝。',
    ].join('\n'),
    pushes: [
      { type: 'push', user: 'KKcat', text: '?你還好嗎', time: pushAt(oldPostDates.p5, '19:36') },
      { type: 'push', user: 'KKcat', text: '欸 回我一下', time: '08/30 10:12' },
      { type: 'push', user: 'KKcat', text: 'k_r_o_w???', time: '08/31 21:44' },
    ],
  },
]
