// 站內「使用者查詢」的可查帳號對照表。
// 受控查詢:只查帳號 ID,不查文章內容。
// 可查名單 = 個資註冊表(profiles.js)的帳號——要讓新帳號可被查到,
// 在 profiles.js 登記一筆名片即可,這裡不用改。

import { profiles } from './profiles.js'

export const searchableIds = Object.keys(profiles)

// trim + 不分大小寫比對,回傳正式 ID;查無回 null
export function lookupUser(input) {
  const query = String(input ?? '')
    .trim()
    .toLowerCase()
  if (!query) return null
  return searchableIds.find((id) => id.toLowerCase() === query) ?? null
}
