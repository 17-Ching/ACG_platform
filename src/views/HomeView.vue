<script>
// 進站畫面:模組層級旗標,每次頁面載入重置。
// 從根目錄進站(或在 / 重新整理)會看到;站內導覽回首頁不重跳;
// 深連結進站時 HomeView 沒掛載,自然不出現。
let entered = false
</script>

<script setup>
import { ref } from 'vue'
import BoardList from '../components/BoardList.vue'
import EntrySplash from '../components/EntrySplash.vue'
import UserSearch from '../components/UserSearch.vue'
import { boards } from '../data/boards.js'

const showSplash = ref(!entered)
function enter() {
  entered = true
  showSplash.value = false
}
</script>

<template>
  <EntrySplash v-if="showSplash" @enter="enter" />
  <section>
    <h2 class="mb-1 text-bbs-dim">【看板列表】@ 夜燈站</h2>
    <BoardList :boards="boards" />
    <div class="mt-3">
      <UserSearch />
    </div>
  </section>
</template>
