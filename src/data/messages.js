// 站內信匣資料。對話文字照 docs/design/懸賞_關卡4_站內信.md 原文,不改寫、不擴寫。
// 各段日期對應總表「舊文與站內信日期」的時間帶(08/08、08/15、08/25、08/29 當晚至 08/30 凌晨、09/01);
// 設計文件只要求「時間戳精確到分」,各則的分鐘數為排版用,非線索。
//
// read + readAt:收信方讀取該則的狀態與日期,畫面照數字呈現、不加解說。
// own:信匣主人發出的訊息(不顯示讀取狀態)。
// delayed:不隨對話直接顯示,由頁面在停留 MAIL_REVEAL_SECONDS 秒後淡入(總表 第六節)。

import {
  storyNow,
  fmtYMD,
  KROW_LAST_ONLINE_TIME,
  VENUE_NAME,
  VENUE_ADDRESS,
} from "./anchors.js";

const READ_TWO_YEARS_LATER = fmtYMD(storyNow); // = 懸賞文發文日(總表)

export const mailboxes = {
  k_r_o_w: {
    messages: [
      {
        id: 1,
        from: "guest_x",
        time: "2014/08/08 02:14",
        content: "看到你在心情板的文了。半夜睡不著的人我懂。",
        read: true,
        readAt: "2014/08/08",
      },
      {
        id: 2,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/08 02:19",
        content: "你也睡不著喔",
      },
      {
        id: 3,
        from: "guest_x",
        time: "2014/08/08 02:21",
        content: "嗯。你聽起來過得不太好。要聊嗎,我不太會睡。",
        read: true,
        readAt: "2014/08/08",
      },
      {
        id: 4,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/08 02:26",
        content: "……好啊。反正也沒人要聽。",
      },

      {
        id: 5,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/15 23:41",
        content: "今天又不想回家",
      },
      {
        id: 6,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/15 23:44",
        content: "你會不會覺得我很煩",
      },
      {
        id: 7,
        from: "guest_x",
        time: "2014/08/15 23:45",
        content: "不會。你想待著就待著。",
        read: true,
        readAt: "2014/08/15",
      },
      {
        id: 8,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/15 23:50",
        content: "謝謝 你是第一個這樣說的人",
      },
      {
        id: 9,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/15 23:52",
        content: "這裡好安靜 只有你會回我",
      },

      {
        id: 10,
        from: "guest_x",
        time: "2014/08/25 21:03",
        content: "週末有個趴,某個大少爺辦的,場面很誇張。",
        read: true,
        readAt: "2014/08/25",
      },
      {
        id: 11,
        from: "guest_x",
        time: "2014/08/25 21:04",
        content: "你這種聊得來的,去了一定不無聊。要來嗎?",
        read: true,
        readAt: "2014/08/25",
      },
      {
        id: 12,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/25 21:09",
        content: "我?可以喔?",
      },
      {
        id: 13,
        from: "guest_x",
        time: "2014/08/25 21:10",
        content: "當然。我傳地址給你。",
        read: true,
        readAt: "2014/08/25",
      },
      {
        id: 14,
        from: "guest_x",
        time: "2014/08/25 21:11",
        content: `${VENUE_ADDRESS}『${VENUE_NAME}』`,
        read: true,
        readAt: "2014/08/25",
      },
      {
        id: 15,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/25 21:14",
        content: "好 我去",
      },
      {
        id: 16,
        from: "k_r_o_w",
        own: true,
        time: "2014/08/25 21:15",
        content: "好久沒這麼期待一件事了",
      },

      // 派對當晚:照片(EXIF 拍攝 23:47)於現場傳出,其後訊息再無人讀
      {
        id: 30,
        from: "guest_x",
        time: "2014/08/29 23:52",
        content: "[附檔:party_0xxx.jpg]",
        link: "/photo/party_0xxx",
        read: true,
        readAt: READ_TWO_YEARS_LATER,
      },
      {
        id: 17,
        from: "guest_x",
        time: "2014/08/29 23:55",
        content: "照片刪掉 你想害死我嗎",
        read: true,
        readAt: READ_TWO_YEARS_LATER,
      },
      {
        id: 18,
        from: "guest_x",
        time: "2014/08/30 00:14",
        content: "人呢",
        read: true,
        readAt: READ_TWO_YEARS_LATER,
      },
      {
        id: 19,
        from: "guest_x",
        time: "2014/08/30 00:36",
        content: "?",
        read: true,
        readAt: READ_TWO_YEARS_LATER,
      },

      {
        id: 20,
        from: "guest_x",
        time: "2014/09/01 20:11",
        content: "你把我們的對話刪掉 現在!",
        read: true,
        readAt: READ_TWO_YEARS_LATER,
      },
      {
        id: 21,
        from: "guest_x",
        time: "2014/09/01 20:12",
        content: "這個帳號以後不要再上線。",
        read: true,
        readAt: READ_TWO_YEARS_LATER,
      },
    ],
    delayed: {
      id: 99,
      from: "k_r_o_w",
      own: true,
      time: `${READ_TWO_YEARS_LATER} ${KROW_LAST_ONLINE_TIME}`,
      content: "我讀了。",
    },
  },
};
