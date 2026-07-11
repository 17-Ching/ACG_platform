import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由規則:
// - /thread/:id 與 /user/:id 都從 src/data/ 的註冊表查資料,查不到就顯示
//   in-world 的「不存在」頁,對外看不出哪些編號真的有內容。
// - 「隱藏頁」= 有註冊資料、但不掛在任何看板或列表上的編號,只能靠線索得知。
//   之後要加獨立型隱藏頁(非文章/個資)時,照下面的寫法直接註冊路徑、不掛導覽。
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/thread/:id',
    name: 'thread',
    component: () => import('../views/ThreadPageView.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/UserProfileView.vue'),
  },
  {
    path: '/user/:id/posts',
    name: 'user-posts',
    component: () => import('../views/PostHistoryView.vue'),
  },
  {
    path: '/user/:id/mail',
    name: 'user-mail',
    component: () => import('../views/MailboxView.vue'),
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
