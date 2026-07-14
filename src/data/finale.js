// 終局文本(docs/design/懸賞_KKcat情感線與終局.md)。
// 對白與結局字句照設計文件原文;標「◆ 佔位」的段落為設計文件未提供、
// 待以提供版本替換的文字,替換時只改本檔。

import {
  storyNow,
  fmtMDY,
  PHOTO_TAKEN_AT,
  PHOTO_GPS,
  ARCHIVE_QUERY_CODE,
  DOSSIER_THREAD,
  BACKUP_THREAD,
  BURIAL_COORDS,
} from './anchors.js'
import { threads } from './threads.js'

const bounty = threads['101']
const bountyLines = bounty.content.split('\n')
const clock = (hhmm) => `${fmtMDY(storyNow)} ${hhmm}`

// ── k_r_o_w 座標站內信 ──

export const krowCoordMail = {
  from: 'k_r_o_w',
  time: clock('23:37'),
  content: '你知道我在哪裡嗎',
}

// 座標輸錯時的一句話(k_r_o_w 口吻)
export const coordRejectText = '不是這裡…再想想'

// 容錯比對:允許有無空格、逗號或空白分隔;小數位要完全一致
export function matchesBurialCoords(input) {
  const target = BURIAL_COORDS.split(', ')
  const parts = String(input ?? '')
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
  return parts.length === 2 && parts[0] === target[0] && parts[1] === target[1]
}

// 座標正確後 k_r_o_w 的回覆(◆ 佔位:一句極簡回覆,待提供版本替換)
// 棄屍地點照:image 先為 null(畫面渲染佔位框),之後填圖檔 import 即無痛換圖
export const krowCoordReply = {
  from: 'k_r_o_w',
  time: clock('23:41'),
  content: '你找到了。',
  photo: {
    image: null,
    alt: '相片',
    caption: '[附檔:相片]',
  },
}

// ── 終局兩封信(二選一,內文照提供版本)──

export const kkcatLetter = {
  id: 'letter-kkcat',
  from: 'KKcat',
  time: clock('23:51'),
  content: [
    '證據都在你手上了。',
    '你要公開,還是……當作沒看過?',
    '',
    '我只求你一件事——',
    '不要再讓他一個人。',
  ].join('\n'),
}

// 封口費信:金額只說「看了就懂」,維持不寫死數字的吊胃口手法
export const justiceLetter = {
  id: 'letter-justice',
  from: 'justice6767',
  time: clock('23:51'),
  content: [
    '查到這裡,你很行。',
    '但你也該知道自己在惹誰了。',
    '',
    '一筆錢已經匯進你的帳戶,數字你看了就懂。',
    '把東西刪一刪,這件事就沒發生過。',
    '你查得到我,我也查得到你。別逼我。',
  ].join('\n'),
}

// 玩家一路蒐集的物證(結局 B 的刪除清單用)
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
    label: '現場採證暨檢驗報告(節本)+ 對話紀錄',
    note: `已封存 · 案件編號 ${ARCHIVE_QUERY_CODE}`,
    to: `/thread/${BACKUP_THREAD}`,
  },
]

// ── 結局 A|揭發(回信給 KKcat)──

export const endingExpose = {
  // 沒選的那封:停在未讀
  unreadLetter: { ...justiceLetter, read: false },
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

// ── 結局 B|收封口費(回信給 justice6767)──

export const endingSilence = {
  // 沒選的那封:停在未讀
  unreadLetter: { ...kkcatLetter, read: false },
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
  // 飄版置底的新懸賞文:開頭與關卡 1 一字不差(氛圍呈現,非新關卡)
  newBounty: {
    author: 'd_a_w_n',
    board: '飄版',
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
