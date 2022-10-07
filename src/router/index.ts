import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import group from './modules/group'
import plan from './modules/plan'
import Layout from '@/views/layout/index.vue'

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Home.vue'),
  meta: {
    title: '登录',
  },
}
export const ErrorRoute:RouteRecordRaw = {
  path:'/',
  name:'首页',
  component:Layout,
  meta: {
    title: '首页',
  },
}

const graphRoute:RouteRecordRaw = {
  path:'/graph',
  name:'画布',
  component:()=>import('@/views/marketGraph/index.vue'),
  meta:{
    title:'画布'
  }
}

export const ForbidenRoute:RouteRecordRaw = {
  path:'/404',
  name:'404',
  component:()=>import('@/views/layout/parentLayout.vue'),
  meta:{
    title:'404'
  }
}

// 需要验证权限路由
export const asyncRoute:any[] = [group,plan,ErrorRoute,graphRoute]
// 普通路由 无需验证权限
export const constantRouter: any[] = [LoginRoute,ForbidenRoute]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRouter,...asyncRoute]
})

router.beforeEach((to, from, next) => {
  if (router.hasRoute(to.name || '')) {
    next()
  } else {
    router.push('/')
  }
})

export default router
