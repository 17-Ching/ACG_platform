// 站內「使用者查詢」的可查帳號對照表。
// 受控查詢:只查帳號 ID,不查文章內容。
// 可查名單 = 個資註冊表(profiles.js)的帳號——要讓新帳號可被查到,
// 在 profiles.js 登記一筆名片即可,這裡不用改。

import { profiles } from './profiles.js'

export const searchableIds = Object.keys(profiles)

// 不分大小寫,並忽略空白/底線/連字號——玩家從線索拼 ID 時常漏掉分隔符。
// 注意:名單內的 ID 正規化後不可撞名(例:同時有 shan_0829 與 shan0829)。
const normalize = (s) =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[\s_-]/g, '')

// 回傳正式 ID;查無回 null
export function lookupUser(input) {
  const query = normalize(input)
  if (!query) return null
  return searchableIds.find((id) => normalize(id) === query) ?? null
}
