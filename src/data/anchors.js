// 全站日期與數值在程式端的單一定義處。
// 每個值都對應 docs/design/數字密碼總表.md;要調整先改總表,再同步這裡。
// 「遊戲當下」= 玩家開啟頁面的當天,其餘日期用相對天數推算(總表「核心日期基準」)。

export const today = new Date()

export function yearsAgo(n, from = today) {
  const d = new Date(from)
  d.setFullYear(d.getFullYear() - n)
  return d
}

// 往前找最近的週五(不含當天)
export function previousFriday(from) {
  const d = new Date(from)
  do {
    d.setDate(d.getDate() - 1)
  } while (d.getDay() !== 5)
  return d
}

// ── 核心日期基準(總表 第一節)──
export const registrationDate = yearsAgo(3) // 註冊日:遊戲當下的 3 年前
export const dormantSince = previousFriday(yearsAgo(2)) // 帳號沉寂起點:2 年前的某個週五夜

// ── 個資頁固定欄位(總表 第四節)──
export const KROW_POST_COUNT = 17
export const KROW_BIRTHDAY = '3 / 14'
export const KROW_LAST_ONLINE_TIME = '00:03' // 最後上線 = 懸賞文發文日(今天)00:03

// ── 日期格式化(BBS 慣用格式)──
const pad = (n) => String(n).padStart(2, '0')

// 2026/07/11(個資頁用)
export function fmtYMD(d) {
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`
}

// 07/11/2026(文章表頭用)
export function fmtMDY(d) {
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`
}

// 07/11(推文、列表用)
export function fmtMD(d) {
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}`
}
