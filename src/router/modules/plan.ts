import Layout from '@/views/layout/index.vue'

const routes = {
  path: '/marketPlan',
  name: 'MarketPlan',
  redirect: '/marketPlan/planList',
  component: Layout,
  meta: {
    icon: 'Tickets',
    title: '营销计划',
    sort: 1,
  },
  children: [
    {
      path: '/marketPlan/planList',
      name: 'PlanList',
      component: () => import('@/views/marketPlan/index.vue'),
      meta: {
        title: '计划列表',
      },
    },
  ],
}

export default routes
