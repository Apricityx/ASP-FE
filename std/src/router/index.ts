import { createRouter, createWebHistory } from 'vue-router'

// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/std',
      name: 'std',
      // @ts-ignore
      component: () => import('../views/Std/StdIndex.vue')
    },
    {
      path: '/std/assignments',
      name: 'assignments',
      // @ts-ignore
      component: () => import('../views/Std/StdAssignmentList.vue')
    }
  ]
})

export default router
