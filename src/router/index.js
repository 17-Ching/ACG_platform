import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由規則:
// - 公開頁:掛在導覽/看板列表上,玩家點得到。
// - 隱藏頁:直接在這裡註冊路徑,但「不掛在任何導覽列或列表」,
//   只能靠線索得知網址後手動輸入。前端註冊 ≠ 公開,這樣就夠了。
//   之後每一關的隱藏頁都照 /thread/000 這條的寫法加。
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    // 【隱藏路由示範】不出現在任何列表;編號 000 僅為示範用,
    // 正式關卡編號一律以 docs/design/數字密碼總表.md 為準。
    path: '/thread/000',
    name: 'hidden-demo',
    component: () => import('../views/HiddenDemoView.vue'),
  },
  {
    // 404:維持 in-world 語氣,不讓玩家分辨「不存在」與「還沒找到」
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
