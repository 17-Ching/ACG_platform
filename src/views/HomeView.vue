<script setup>
import BoardList from '../components/BoardList.vue'
import UserSearch from '../components/UserSearch.vue'
import { boards } from '../data/boards.js'
</script>

<template>
  <section>
    <h2 class="mb-1 text-bbs-dim">【看板列表】@ 夜燈站</h2>
    <BoardList :boards="boards" />
    <div class="mt-3">
      <UserSearch />
    </div>
  </section>
</template>
