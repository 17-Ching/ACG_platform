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
  ARCHIVE_QUERY_CODE,
  BACKUP_THREAD,
  BACKUP_POST_DATE,
  COORD_SHIFT_LAT,
} from "./anchors.js";
import { oldPosts } from "./oldPosts.js";
import { boardPosts } from "./boardPosts.js";
import { profiles } from "./profiles.js";
import newsScan from "../assets/news.png";
import reportScan from "../assets/report.webp";
import chatShot from "../assets/chat_confession.png";

// 推文時間戳:故事當下(2016/08/29)的某個時刻
const at = (clock) => `${fmtMD(storyNow)} ${clock}`;

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
      time: at("00:12"),
    },
    {
      type: "push",
      user: "rich_hunter",
      text: "不過懸賞金多少先講",
      time: at("00:13"),
    },
    {
      type: "push",
      user: "momo_2",
      text: "k_r_o_w?這 ID 我好像有印象欸",
      time: at("00:31"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "……這個帳號我認識。他不是會開這種玩笑的人。",
      time: at("00:47"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "而且他兩年沒上線了。",
      time: at("00:48"),
    },
    {
      type: "push",
      user: "路人",
      text: "樓上認真的?起雞皮疙瘩",
      time: at("01:03"),
    },
    {
      type: "push",
      user: "abc999",
      text: "反正閒著,我玩玩看。回到我開始的地方是三小",
      time: at("09:26"),
    },
    {
      type: "push",
      user: "momo_2",
      text: "他自己最早的文?點他 ID 看發文紀錄啊",
      time: at("09:41"),
    },
    // 關卡 5 軟提示(依總表新規則調整,不明寫算式)
    {
      type: "push",
      user: "KKcat",
      text: "檔名從來不是隨便取的。時、分,還有座標的整數。加起來。",
      time: at("20:15"),
    },
    // 關卡 6 入口軟提示:指向八卦板的上鎖文章
    {
      type: "push",
      user: "momo_2",
      text: "話說八卦板有人把這 ID 的底查出來了 結果文章鎖著 是在演哪齣",
      time: at("21:47"),
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
    "",
    "那則地方新聞有人貼過了，自己看。",
  ].join("\n"),
  // 文末引用區塊:引個資頁的欄位原值,整塊可點回 /user/k_r_o_w
  quotes: [
    {
      title: "協尋",
      lines: [`[轉貼] 兩年前的舊聞,有人記得嗎`],
      to: "/thread/258",
    },
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
      time: at("21:18"),
    },
    {
      type: "push",
      user: "data_digger",
      text: "我沒說。我只說 IP 和密碼被動過。",
      time: at("21:20"),
    },
    {
      type: "push",
      user: "data_digger",
      text: "也可能是他自己。我不知道。我只把資料放這。",
      time: at("21:21"),
    },
    {
      type: "push",
      user: "路人",
      text: "那個新聞我有印象…原來就是他喔 幹 有點難過",
      time: at("21:29"),
    },
    {
      type: "push",
      user: "rich_hunter",
      text: "所以到底有沒有懸賞金啦(怕",
      time: at("21:33"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "……你們現在才知道他失蹤。",
      time: at("21:40"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "我兩年前就跟你們說過,他不是會消失的人。",
      time: at("21:41"),
    },
    { type: "push", user: "KKcat", text: "沒人信。", time: at("21:41") },
    {
      type: "push",
      user: "momo_2",
      text: "KKcat 你先冷靜 你是不是知道什麼",
      time: at("21:45"),
    },
    // 以下三則為關卡 7 的追查線頭(設計文件之外的補充,data_digger 維持只擺事實)
    {
      type: "push",
      user: "momo_2",
      text: "所以那個案子呢 就這樣不了了之?",
      time: at("21:52"),
    },
    {
      type: "push",
      user: "data_digger",
      text: "通報後沒幾天就沒下文了。為什麼,自己想。",
      time: at("21:55"),
    },
    {
      type: "push",
      user: "data_digger",
      text: "如果有人手上有那晚的東西,把時間、地點對一對。",
      time: at("21:58"),
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
  // 新聞網頁翻拍(關卡 6 擴充):線索在圖內,頁面文字不重複拼出
  images: [{ src: newsScan, alt: "地方新聞網頁翻拍" }],
  pushes: [
    {
      type: "arrow",
      user: "路人",
      text: "這則後來沒有後續了。就這樣沒了。",
      time: at("22:06"),
    },
    // 極軟提示:只指向圖上的污漬,不拼字、不指名
    {
      type: "push",
      user: "abc999",
      text: "那個污漬是滴到了啥",
      time: at("22:24"),
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
    "│ 附件編號    ████-████-███(已封存,無法調閱)",
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
      time: at("23:11"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "他要是返家了,還會叫我不要找他嗎。",
      time: at("23:12"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "他根本沒有家可以回。",
      time: at("23:14"),
    },
    // 關卡 7.5 軟提示:指向格式與「重用一路解過的碼」,不列答案
    {
      type: "push",
      user: "data_digger",
      text: "塗黑蓋得住數字,蓋不住長度。",
      time: at("23:22"),
    },
    {
      type: "push",
      user: "KKcat",
      text: "你一路解開的那些數字,不是用完就丟的。",
      time: at("23:25"),
    },
  ],
};

// 飄版目擊文(night_hiker,2014 舊文):上鎖文對話截圖「飄版有人 po 說
// 看到黑影」指的就是這篇。中段反白段落用 contentParts 的 hidden 部分呈現,
// 位移值引用總表「終局座標」;justice6767 推文照提供版本。
// 推文時間與對話截圖對齊:小開 00:36 下令壓文,justice6767 之後才出現。
const ghostSighting = {
  id: "218", // 登錄於總表「隱藏頁/特殊路由一覽」
  board: "飄版",
  author: "night_hiker",
  title: "[經驗] 半夜在會館附近看到的黑影",
  date: new Date(2014, 7, 30, 23, 41),
  time: "08/30/2014 23:41",
  contentParts: [
    {
      text: [
        "發生在前陣子,到現在還是覺得毛毛的,想上來問大家。",
        "",
        "那天半夜我睡不著,開車上山想去會館那邊的產業道路兜風",
        "(對就是新聞在吵那間常擾民的會館附近)。",
        "",
        "經過一座小土地公廟的時候,遠遠看到有兩三個人影在後面空地",
        "拿著東西在挖,車燈一照他們就停下來往我這邊看,",
        "我嚇到油門直接催走,後照鏡裡那幾個黑影就站在那裡一直看我…",
        "",
        "回到家越想越不對,那個時間、那個地方,誰會在那邊挖東西?",
        "我知道這樣講很鬧,但我真的覺得那不是活人該做的事。",
        "",
        "──────────────────────────",
        "(怕以後忘記,把位置記一下,免得哪天真的怎麼樣沒人知道我去過哪)",
        "",
      ].join("\n"),
    },
    {
      hidden: true,
      text: [
        "土地公廟就在會館正north一點點,經緯度大概是會館那組",
        `再往上加 ${COORD_SHIFT_LAT} 就到了`,
      ].join("\n"),
    },
    {
      text: ["", "──────────────────────────"].join("\n"),
    },
  ],
  pushes: [
    {
      type: "push",
      user: "aaa123",
      text: "樓主別嚇我 起雞皮疙瘩",
      time: "08/30 23:58",
    },
    {
      type: "push",
      user: "mountain_cat",
      text: "那間會館本來就怪 之前也有人說晚上有聲音",
      time: "08/31 00:16",
    },
    {
      type: "push",
      user: "justice6767",
      text: "三小啦 看太多鬼片喔 挖土=鬧鬼?農夫都是鬼囉 zzz",
      time: "08/31 00:44",
    },
    {
      type: "push",
      user: "justice6767",
      text: "這種文也信 難怪台灣鬼故事永遠寫不完 笑死",
      time: "08/31 00:45",
    },
    {
      type: "push",
      user: "night_hiker",
      text: "我知道很扯…但我真的沒騙人 就記錄一下",
      time: "08/31 01:02",
    },
    {
      type: "push",
      user: "justice6767",
      text: "記錄勒 刪一刪啦 別誤導別人 檢舉了",
      time: "08/31 01:15",
    },
  ],
};

// shan_0829 的未公開上鎖文:不掛任何看板(unlisted),只出現在他的帳號頁。
// 解鎖碼 = 案件編號(總表),與帳號頁入口一併登錄於總表第五、八節。
// 對話紀錄先用文字版佔位(chatLogs),之後補真截圖時填 image 即可。
const shanBackup = {
  id: BACKUP_THREAD,
  unlisted: true,
  author: "shan_0829",
  title: "[備份] 我留了一份。",
  locked: {
    code: ARCHIVE_QUERY_CODE,
    hint: "鑰匙就是編號。你一路查過的那三段,拼起來。",
    wrongText: "不是這個。你還沒查到那一步。",
  },
  date: BACKUP_POST_DATE,
  time: `${fmtMDY(BACKUP_POST_DATE)} 02:11`,
  content: "我留了一份,在這裡。",
  images: [{ src: reportScan, alt: "現場採證暨檢驗報告(節本)掃描件" }],
  chatLogs: [
    {
      // 真截圖已補上;lines 保留為校對底稿與備援,不再渲染
      image: chatShot,
      caption: "[翻拍] 對話紀錄(來源不明)",
      lines: [
        { speaker: "小開", text: "處理好了嗎" },
        { speaker: "友人", text: "好了 都清乾淨了" },
        { speaker: "小開", text: "那個…東西呢" },
        { speaker: "友人", text: "丟在會館後面 埋了 別再問" },
        // 座標行:以塗黑狀態顯示,之後的步驟才做解讀
        { speaker: "友人", text: "████████████████████", redacted: true },
        { speaker: "小開", text: "確定沒人看到" },
        {
          speaker: "友人",
          text: "靠 你別烏鴉嘴 飄版竟然有人 po 說那晚看到黑影",
        },
        { speaker: "小開", text: "幹 那篇壓一下 叫 justice6767 去洗" },
        { speaker: "友人", text: "已經在弄了 沒人會信啦 當鬼故事而已" },
      ],
    },
  ],
};

export const pinnedThread = bounty;

export const threads = {
  [bounty.id]: bounty,
  [dossier.id]: dossier,
  [newsRepost.id]: newsRepost,
  [caseClosure.id]: caseClosure,
  [ghostSighting.id]: ghostSighting,
  [shanBackup.id]: shanBackup,
  ...Object.fromEntries(oldPosts.map((post) => [post.id, post])),
  ...Object.fromEntries(boardPosts.map((post) => [post.id, post])),
};
