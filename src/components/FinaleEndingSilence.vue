<script setup>
import MessageThread from './MessageThread.vue'
import FinaleOutro from './FinaleOutro.vue'
import { endingSilence, evidenceItems } from '../data/finale.js'

// 沒回的那封信 + 後來的訊息,全部停在未讀
const unreadMessages = [
  { id: 'letter', ...endingSilence.unreadLetter },
  { id: 'kk-1', ...endingSilence.unread[0] },
  { id: 'kk-2', ...endingSilence.unread[1] },
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <MessageThread :messages="unreadMessages" />

    <!-- 錢到帳,畫面安靜 -->
    <div
      class="whitespace-pre-wrap border border-bbs-border bg-bbs-panel px-3 py-2"
    >{{ endingSilence.receipt }}</div>

    <!-- 手上的東西,一項一項不見 -->
    <div class="border border-bbs-border bg-bbs-panel">
      <div class="border-b border-bbs-border px-3 py-1 text-bbs-accent">
        ┌ 暫存檔 ─ 你手上的東西
      </div>
      <ul class="px-3 py-2">
        <li v-for="(item, i) in evidenceItems" :key="i" class="flex gap-2 py-0.5 text-bbs-dim">
          <span class="shrink-0">▪</span>
          <span class="flex-1 line-through">{{ item.label }}</span>
          <span class="shrink-0">已刪除</span>
        </li>
      </ul>
    </div>

    <!-- 飄版最底出現另一個沉寂帳號的新懸賞文 -->
    <article class="border border-bbs-border bg-bbs-panel">
      <header class="border-b border-bbs-border px-3 py-2">
        <div>
          <span class="text-bbs-dim">作者</span>
          <RouterLink
            :to="`/user/${endingSilence.newBounty.author}`"
            class="ml-2 text-bbs-bright hover:underline"
          >{{ endingSilence.newBounty.author }}</RouterLink>
          <span class="float-right text-bbs-dim">
            看板 <span class="text-bbs-accent">{{ endingSilence.newBounty.board }}</span>
          </span>
        </div>
        <div>
          <span class="text-bbs-dim">標題</span>
          <span class="ml-2 text-bbs-warn">{{ endingSilence.newBounty.title }}</span>
        </div>
        <div>
          <span class="text-bbs-dim">時間</span>
          <span class="ml-2">{{ endingSilence.newBounty.time }}</span>
        </div>
      </header>
      <div class="whitespace-pre-wrap break-words px-3 py-3">{{ endingSilence.newBounty.lines.join('\n') }}</div>
    </article>

    <!-- KKcat 最後一篇公開發文 -->
    <article class="border border-bbs-border bg-bbs-panel">
      <header class="border-b border-bbs-border px-3 py-2">
        <div>
          <span class="text-bbs-dim">作者</span>
          <span class="ml-2 text-bbs-bright">{{ endingSilence.lastPost.author }}</span>
        </div>
        <div>
          <span class="text-bbs-dim">標題</span>
          <span class="ml-2 text-bbs-warn">{{ endingSilence.lastPost.title }}</span>
        </div>
      </header>
      <div class="whitespace-pre-wrap px-3 py-3">{{ endingSilence.lastPost.content }}</div>
    </article>

    <FinaleOutro />
  </div>
</template>
