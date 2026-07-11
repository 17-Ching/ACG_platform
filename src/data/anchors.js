// 全站日期與數值在程式端的單一定義處。
// 每個值都對應 docs/design/數字密碼總表.md;要調整先改總表,再同步這裡。
// 全站年代固定在 2016,不隨真實時間變動(總表「核心日期基準」)。

// ── 核心日期基準 ──
export const storyNow = new Date(2016, 7, 29) // 故事當下 = 懸賞文發文日 2016/08/29
export const registrationDate = new Date(2013, 3, 22) // 註冊日 2013/04/22
export const dormantSince = new Date(2014, 7, 29) // 帳號沉寂起點 2014/08/29(週五)

// ── 舊文日期(總表「舊文與站內信日期」)──
export const oldPostDates = {
  p1: new Date(2014, 1, 17), // 舊文① 有人半夜也睡不著的嗎(時刻 03:47)
  p2: new Date(2014, 2, 5), // 舊文② 你們家晚上會很安靜嗎(01:12)
  p3: new Date(2014, 2, 14), // 舊文③ 今天生日(= 生日 3/14)
  p4: new Date(2014, 7, 25), // 舊文④ 認識了一個網友
  p5: new Date(2014, 7, 29), // 舊文⑤ 無標題
}

// ── 個資頁固定欄位(總表 第四節)──
export const KROW_POST_COUNT = 17
export const KROW_BIRTHDAY = '3 / 14'
export const KROW_LAST_ONLINE_TIME = '00:03'

// ── 密碼 / 觸發(總表 第二、六節)──
export const MAILBOX_PASSCODE = '0314' // 站內信通行碼(關卡 3)
export const MAIL_REVEAL_SECONDS = 30 // 站內信最底那則訊息的淡入等待秒數

// ── 關卡 5 相片(總表「關卡 5 檔名密碼推導」)──
export const PHOTO_CLOCK = '23:47' // 照片內電子鐘
export const PHOTO_GPS = '24.876502, 121.318831' // EXIF 座標(虛構地點),尾三碼 831
export const PHOTO_THREAD = '178' // 檔名密碼解出的文章編號 → /thread/178

// ── 日期格式化(BBS 慣用格式)──
const pad = (n) => String(n).padStart(2, '0')

// 2016/08/29(個資頁、發文紀錄用)
export function fmtYMD(d) {
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`
}

// 08/29/2016(文章表頭用)
export function fmtMDY(d) {
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`
}

// 08/29(推文、列表用)
export function fmtMD(d) {
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}`
}

// EXIF 拍攝時間 = 失蹤日當晚,與照片鐘面一致(總表)
export const PHOTO_TAKEN_AT = `${fmtYMD(dormantSince)} ${PHOTO_CLOCK}`
