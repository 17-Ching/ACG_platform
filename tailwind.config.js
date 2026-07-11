/** @type {import('tailwindcss').Config} */

// 復古 BBS 視覺基調的單一來源。
// 所有頁面與元件一律引用這裡的色票與字體,不要在個別元件裡另定顏色。
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        // 終端底色與面板
        bbs: {
          bg: '#0a0c0d', // 全站背景:近黑
          panel: '#101416', // 區塊底色:略浮起的深灰
          border: '#2a3236', // 分隔線/框線
          fg: '#c9cec9', // 一般內文:偏灰的白
          dim: '#6d7876', // 次要資訊:低調灰綠
          bright: '#eef2ee', // 強調文字:亮白
          accent: '#5fc7c7', // 主色:老終端青
          link: '#7ab8d9', // 連結/可點擊
          warn: '#d9b96a', // 提示/精華:土黃
          push: '#8fbf6f', // 推文「推」:綠
          boo: '#cf6f6f', // 推文「噓」:紅
          sel: '#1b2f33', // 反白/選取列底色
        },
      },
      fontFamily: {
        // 等寬為主;MingLiU(細明體)負責中文的老 BBS 質感
        mono: [
          'Consolas',
          '"Courier New"',
          '"Noto Sans Mono"',
          'MingLiU',
          '"細明體"',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
