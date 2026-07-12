// 終局文本(docs/design/懸賞_KKcat情感線與終局.md)。
// 對白與結局字句照設計文件原文;證據清單彙整自各關既有物件,連回原出處。

import {
  storyNow,
  fmtMDY,
  PHOTO_TAKEN_AT,
  PHOTO_GPS,
  ARCHIVE_QUERY_CODE,
  DOSSIER_THREAD,
} from './anchors.js'
import { threads } from './threads.js'

const bounty = threads['101']
const bountyLines = bounty.content.split('\n')
const clock = (hhmm) => `${fmtMDY(storyNow)} ${hhmm}`

// ── 抉擇點 ──

// 玩家一路蒐集的物證,各項連回原出處。
export const evidenceItems = [
  {
    label: '派對照片 party_0xxx.jpg',
    note: `${PHOTO_TAKEN_AT} · ${PHOTO_GPS}`,
    to: '/photo/party_0xxx',
  },
  {
    label: 'k_r_o_w 站內信匣 對話備份',
    note: '邀約、地址、最後一張照片',
    to: '/user/k_r_o_w/mail',
  },
  {
    label: '帳號底細整理(登入 IP、密碼重設時間)',
    note: `八卦板 #${DOSSIER_THREAD} 全文備份`,
    to: `/thread/${DOSSIER_THREAD}`,
  },
  {
    label: '協尋紀錄比對(舊聞 × 結案畫面)',
    note: '「自行返家」',
    to: '/thread/259',
  },
  {
    label: '現場採證暨檢驗報告(節本)',
    note: `已封存 · 調閱編號 ${ARCHIVE_QUERY_CODE}`,
    to: '/archive',
  },
]

// 收在證據清單底下的一行(呼應懸賞主文「很有頭有臉的人」)
export const evidenceFooter = '一個很有頭有臉的人,不想讓你知道的事。現在,全部在你手上。'

// 封口費入帳通知(金額沿用關卡 1 的吊胃口手法,不寫死)
export const transferNotice = {
  from: '(未具名)',
  time: clock('23:37'),
  content: [
    '┌──────────────────',
    '│ 轉帳入帳通知',
    '│',
    '│ 金額    ███,███,███',
    '│ 附言    刪掉你手上的東西。這是你的。',
    '└──────────────────',
  ].join('\n'),
}

// 抉擇點引述懸賞主文的兩行(關卡 1 原文,在此刻應驗)
export const bountyQuote = {
  title: bounty.title,
  lines: bountyLines.filter((l) => l.startsWith('懸賞金') || l.startsWith('真的。')),
  to: `/thread/${bounty.id}`,
}

// KKcat 最後一則私訊(設計文件原文)
export const kkcatFinalWords = [
  { from: 'KKcat', time: clock('23:51'), content: '我沒辦法替你按下去。' },
  { from: 'KKcat', time: clock('23:51'), content: '但拜託你……不要再讓他一個人。' },
]

// ── 結局 A|揭發 ──

export const endingExpose = {
  // 新聞跑馬燈:只報導「事情浮上檯面」,結果留白
  ticker: [
    '【快訊】網路流傳疑遭封存之案件文件 輿論譁然',
    '【快訊】兩年前少年協尋案「自行返家」結案 疑點議論再起',
    '【快訊】X 家山區會館深夜聚會傳聞 家族辦公室:不予回應',
    '【快訊】相關單位:已著手了解',
  ],
  messages: [
    { from: 'KKcat', time: clock('23:58'), content: '…謝謝你。' },
    { from: 'KKcat', time: clock('23:59'), content: '我終於可以跟他說,有人聽見了。' },
  ],
  signature: '你不是沒人記得。',
}

// ── 結局 B|收封口費 ──

export const endingSilence = {
  receipt: [
    '┌──────────────────',
    '│ 轉帳入帳通知',
    '│',
    '│ 金額    ███,███,███',
    '│ 狀態    已入帳',
    '└──────────────────',
  ].join('\n'),
  unread: [
    { from: 'KKcat', time: clock('23:58'), content: '你還在嗎', read: false },
    { from: 'KKcat', time: clock('23:59'), content: '是不是……連你也', read: false },
  ],
  // 另一個沉寂帳號的新懸賞文:開頭與關卡 1 一字不差(氛圍呈現,非新關卡)
  newBounty: {
    author: 'd_a_w_n',
    board: bounty.board,
    title: bounty.title,
    time: '--/--/---- 00:00',
    lines: [...bountyLines.slice(0, 4), '', '(下略)'],
  },
  lastPost: {
    author: 'KKcat',
    title: '(無標題)',
    content: '原來每次都是這樣。',
  },
}
