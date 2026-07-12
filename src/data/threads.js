// 文章資料註冊表。頁面用 /thread/:id 從這裡查,查不到就顯示 in-world 的不存在頁。
// 「掛不掛在看板/列表上」決定一篇文是公開還是隱藏——隱藏文一樣註冊在這裡,
// 只是不出現在任何列表,得靠線索知道編號。
//
// 文字內容一律照 docs/design/ 對應設計文件原文,不改寫、不擴寫。

import {
  storyNow,
  caseClosedDate,
  fmtYMD,
  fmtMDY,
  fmtMD,
  PHOTO_CODE,
  DOSSIER_THREAD,
} from "./anchors.js";
import { oldPosts } from "./oldPosts.js";
import { boardPosts } from "./boardPosts.js";
import { profiles } from "./profiles.js";

// 懸賞主文(docs/design/懸賞_關卡1與2_懸賞主文與起疑.md)
// 發文日 = 故事當下 00:00(總表:懸賞文發文日)
const bounty = {
  id: "101", // 公開文章編號,登錄於總表「隱藏頁/特殊路由一覽」
  board: "協尋",
  pinned: true,
  author: "k_r_o_w",
  title: "[懸賞] 我藏了東西。找到的人,錢是你的。",
  date: storyNow,
  time: `${fmtMDY(storyNow)} 00:00`,
  content: [
    "規則很簡單:跟著線索走就好。",
    "",
    "第一關免費送你:回到我開始的地方。",
    "那裡有人替我留了話,只是沒人看得懂。",
    "",
    "找對了,你就知道下一步。找到最後,",
    "你會知道一個很有頭有臉的人,不想讓你知道的事。",
    "",
    "懸賞金:夠你不用再上班。",
    "真的。到帳那天你就信了。",
    "",
    "—— 別問我是誰。你遲早會查到。",
  ].join("\n"),
  pushes: [
    {
      type: "push",
      user: "rich_hunter",
      text: "又一個釣魚文 zzz",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "rich_hunter",
      text: "不過懸賞金多少先講",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "momo_2",
      text: "k_r_o_w?這 ID 我好像有印象欸",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "……這個帳號我認識。他不是會開這種玩笑的人。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "而且他兩年沒上線了。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "路人",
      text: "樓上認真的?起雞皮疙瘩",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "abc999",
      text: "反正閒著,我玩玩看。回到我開始的地方是三小",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "momo_2",
      text: "他自己最早的文?點他 ID 看發文紀錄啊",
      time: fmtMD(storyNow),
    },
    // 關卡 5 軟提示(依總表新規則調整,不明寫算式)
    {
      type: "push",
      user: "KKcat",
      text: "檔名從來不是隨便取的。時、分,還有座標的整數。加起來。",
      time: fmtMD(storyNow),
    },
    // 關卡 6 入口軟提示:指向八卦板的上鎖文章
    {
      type: "push",
      user: "momo_2",
      text: "話說八卦板有人把這 ID 的底查出來了 結果文章鎖著 是在演哪齣",
      time: fmtMD(storyNow),
    },
  ],
};

// 關卡 6 人肉包:掛在八卦板的上鎖文章,編號與解鎖碼皆引用總表。
// 內文與推文照 docs/design/懸賞_關卡6_人肉搜索反轉.md 原文。
const dossier = {
  id: DOSSIER_THREAD,
  board: "八卦",
  author: "data_digger",
  title: "[爆卦] 我查到那個 ID 是誰了…你們最好坐著看",
  locked: { code: PHOTO_CODE },
  date: storyNow,
  time: `${fmtMDY(storyNow)} 21:12`,
  content: [
    "整理一下,自己判斷。",
    "",
    "【這個 ID】",
    "· 註冊三年前,發文 17 篇,全是深夜心情文。",
    "· 兩年前「失蹤當週」那篇之後,整整兩年 0 發文、0 上線。",
    "· 然後前陣子,突然發了懸賞文。",
    "",
    "【這個人】",
    "· 比對舊文透露的線索(學區、生活圈、口氣),",
    "  對得上兩年前一則沒什麼人轉的地方新聞:",
    "  一名國中生離家後失蹤,通報後查無下落,不了了之。",
    "· 年紀、時間、生活圈,全部吻合。",
    "· 講白一點:發懸賞文的這個帳號,",
    "  它的主人兩年前就不見了,而且很可能已經不在了。",
    "",
    "【但這裡開始不對勁】",
    "· 我去比對登入紀錄。這個帳號「失蹤後兩年」是死的沒錯,",
    "· 但最近的登入 IP,跟他本人以前慣用的完全不一樣。",
    "· 而且密碼被重設過一次——時間就在懸賞文貼出來的前幾天。",
    "",
    "所以問題來了:",
    "一個兩年前就失蹤的人,",
    "是誰在幾天前,重設了他的密碼、登入、然後發文?",
  ].join("\n"),
  // 文末引用區塊:引個資頁的欄位原值,整塊可點回 /user/k_r_o_w
  quotes: [
    {
      title: "會員資料 —— k_r_o_w",
      lines: [`最後上線    ${profiles.k_r_o_w.lastLogin}`],
      to: "/user/k_r_o_w",
    },
  ],
  pushes: [
    {
      type: "push",
      user: "momo_2",
      text: "等等 所以發文的不是他本人?",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "data_digger",
      text: "我沒說。我只說 IP 和密碼被動過。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "data_digger",
      text: "也可能是他自己。我不知道。我只把資料放這。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "路人",
      text: "那個新聞我有印象…原來就是他喔 幹 有點難過",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "rich_hunter",
      text: "所以到底有沒有懸賞金啦(怕",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "……你們現在才知道他失蹤。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "我兩年前就跟你們說過,他不是會消失的人。",
      time: fmtMD(storyNow),
    },
    { type: "push", user: "KKcat", text: "沒人信。", time: fmtMD(storyNow) },
    {
      type: "push",
      user: "momo_2",
      text: "KKcat 你先冷靜 你是不是知道什麼",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "我只知道,他最後一句話是叫我不要找他。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "可是他明明就在找我們。",
      time: fmtMD(storyNow),
    },
    // 以下三則為關卡 7 的追查線頭(設計文件之外的補充,data_digger 維持只擺事實)
    {
      type: "push",
      user: "momo_2",
      text: "所以那個案子呢 就這樣不了了之?",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "data_digger",
      text: "通報後沒幾天就沒下文了。為什麼,自己想。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "data_digger",
      text: "如果有人手上有那晚的東西,把時間、地點對一對。",
      time: fmtMD(storyNow),
    },
  ],
};

// 關卡 7 紀錄 A:地方新聞轉貼(docs/design/懸賞_關卡7_被抹掉的紀錄.md 原文)。
// 由人肉包推文裡說「那個新聞我有印象」的路人貼出。
const newsRepost = {
  id: "258", // 登錄於總表「隱藏頁/特殊路由一覽」
  board: "協尋",
  author: "路人",
  title: "[轉貼] 兩年前的舊聞,有人記得嗎",
  date: new Date(2016, 7, 29, 22, 5),
  time: `${fmtMDY(storyNow)} 22:05`,
  content: [
    "〈少年離家後失蹤 家屬報案〉",
    "",
    "……一名十四歲少年離家後失去聯繫,家屬於數日後報案。",
    "警方表示已受理協尋。……",
  ].join("\n"),
  pushes: [
    {
      type: "arrow",
      user: "路人",
      text: "這則後來沒有後續了。就這樣沒了。",
      time: fmtMD(storyNow),
    },
  ],
};

// 關卡 7 紀錄 B:協尋案件結案截圖(同上設計文件)。
// 結案日期引用總表;「附件編號」塗黑列是關卡 7.5 卷宗調閱的線頭。
const caseClosure = {
  id: "259", // 登錄於總表「隱藏頁/特殊路由一覽」
  board: "八卦",
  author: "data_digger",
  title: "[截圖] 我調到這個案子的狀態,你們看日期",
  date: new Date(2016, 7, 29, 23, 8),
  time: `${fmtMDY(storyNow)} 23:08`,
  content: [
    "┌──────────────────────────",
    "│ 協尋案件狀態查詢",
    "│",
    "│ 案件狀態    已結案",
    "│ 結案事由    當事人自行返家,協尋解除",
    `│ 結案日期    ${fmtYMD(caseClosedDate)}`,
    "│ 附件編號    ███-████-███(已封存,無法調閱)",
    "└──────────────────────────",
  ].join("\n"),
  quotes: [
    {
      title: "轉貼:兩年前的舊聞",
      lines: ["〈少年離家後失蹤 家屬報案〉"],
      to: "/thread/258",
    },
  ],
  pushes: [
    {
      type: "push",
      user: "KKcat",
      text: "「自行返家」。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "他要是返家了,還會叫我不要找他嗎。",
      time: fmtMD(storyNow),
    },
    {
      type: "push",
      user: "KKcat",
      text: "他根本沒有家可以回。",
      time: fmtMD(storyNow),
    },
  ],
};

export const pinnedThread = bounty;

export const threads = {
  [bounty.id]: bounty,
  [dossier.id]: dossier,
  [newsRepost.id]: newsRepost,
  [caseClosure.id]: caseClosure,
  ...Object.fromEntries(oldPosts.map((post) => [post.id, post])),
  ...Object.fromEntries(boardPosts.map((post) => [post.id, post])),
};
