<script setup>
import { useRouter } from "vue-router";
import { useFinaleStore } from "../stores/finale.js";
import { useProgressStore } from "../stores/progress.js";

const router = useRouter();
const finale = useFinaleStore();
const progress = useProgressStore();

function restart() {
  progress.reset();
  finale.rechoose();
  router.push("/");
}
</script>

<template>
  <div
    class="mt-4 border-t border-dashed border-bbs-border pt-4 text-center text-bbs-dim"
  >
    <p>本作為虛構解謎創作,人物、帳號、組織與事件皆屬虛構。</p>
    <div class="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
      <button
        type="button"
        class="text-bbs-link hover:text-bbs-bright"
        @click="finale.rechoose()"
      >
        [回到抉擇點]
      </button>
      <button
        type="button"
        class="text-bbs-link hover:text-bbs-bright"
        @click="restart"
      >
        [清除全部進度,重新開始]
      </button>
    </div>
  </div>
</template>
