import { createRouter, createWebHistory } from 'vue-router'

// @ts-ignore
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      // @ts-ignore
      component: () => import('../views/index.vue')
    },
    {
      path: '/assignments',
      name: 'assignments',
      // @ts-ignore
      component: () => import('../views/assignments.vue')
    }
  ]
})

export default router