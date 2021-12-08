import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import('@/views/Study.vue'),
  },
  { path: '/', redirect: { name: 'Home' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
