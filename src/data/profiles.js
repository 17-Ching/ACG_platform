// 會員個資註冊表。頁面用 /user/:id 查,查不到就顯示 in-world 的查無此人。
// 欄位值一律引用 src/data/anchors.js(= 總表),不在這裡硬寫數字。

import {
  storyNow,
  registrationDate,
  fmtYMD,
  KROW_POST_COUNT,
  KROW_BIRTHDAY,
  KROW_LAST_ONLINE_TIME,
} from './anchors.js'

export const profiles = {
  k_r_o_w: {
    id: 'k_r_o_w',
    registeredAt: fmtYMD(registrationDate),
    postCount: KROW_POST_COUNT,
    birthday: KROW_BIRTHDAY,
    lastLogin: `${fmtYMD(storyNow)} ${KROW_LAST_ONLINE_TIME}`,
    signature: '「如果我之後都沒上線,幫我跟他說聲謝謝。」',
  },
}
