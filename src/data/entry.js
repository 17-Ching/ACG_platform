// 進站畫面(EntrySplash)文案。系統時間固定在故事當下的深夜,
// 不隨真實時間變動;訪客帳號沿用 visitorPosts 的 VISITOR_ID。
import { storyNow, fmtYMD } from './anchors.js'
import { VISITOR_ID } from '../stores/visitorPosts.js'

export const entry = {
  title: '▌夜燈站 Yodeng BBS',
  host: 'telnet://yodeng.twbbs.org',
  systemTime: `${fmtYMD(storyNow)} 23:52`,
  online: '線上人數:1024',
  loginLines: [
    '以訪客身分登入……',
    `歡迎你,${VISITOR_ID}`,
  ],
  notice: [
    '※ 站務公告:',
    '協尋板出現一篇懸賞文,發文帳號已',
    '沉寂多年。內容真偽請網友自行判斷,',
    '本站不負查證之責。',
    '',
    '站上的東西,看仔細一點。',
    '有些數字,記下來會有用。',
  ],
  enterHint: '[ 按任意鍵進站 ]',
  disclaimer: '本作為虛構解謎創作,人物、組織與事件皆屬虛構。',
}
