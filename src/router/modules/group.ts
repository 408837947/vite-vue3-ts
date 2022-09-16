import Layout from '@/views/layout/index.vue'

const routes = {
  path: '/group',
  name: 'Group',
  redirect: '/group/grouplist',
  component: Layout,
  meta: {
    icon: 'User',
    title: '群组管理',
    sort: 1,
  },
  children: [
    {
      path: '/group/grouplist',
      name: 'GroupList',
      component: () => import('@/views/Study.vue'),
      meta: {
        title: '群组列表',
      },
    },
  ],
}

export default routes
