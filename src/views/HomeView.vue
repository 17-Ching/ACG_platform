<script setup>
// 外殼預覽頁:把四個共用元件用假資料排在一起,供確認視覺基調。
// 外殼定案後,首頁會改成純看板列表,其餘元件由各關卡頁使用。
import BoardList from '../components/BoardList.vue'
import ThreadView from '../components/ThreadView.vue'
import ProfileCard from '../components/ProfileCard.vue'
import MessageThread from '../components/MessageThread.vue'
import { demoBoards, demoThread, demoProfile, demoMessages } from '../data/demo.js'
</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="text-bbs-dim">※ 以下為共用元件外殼預覽(假資料)</p>

    <section>
      <h2 class="mb-1 text-bbs-dim">【看板列表 BoardList】</h2>
      <BoardList :boards="demoBoards" />
    </section>

    <section>
      <h2 class="mb-1 text-bbs-dim">【文章串 ThreadView】</h2>
      <ThreadView :thread="demoThread" />
    </section>

    <section>
      <h2 class="mb-1 text-bbs-dim">【會員個資卡 ProfileCard】</h2>
      <ProfileCard :profile="demoProfile" />
    </section>

    <section>
      <h2 class="mb-1 text-bbs-dim">【站內信 MessageThread】</h2>
      <MessageThread :messages="demoMessages" />
    </section>
  </div>
</template>
