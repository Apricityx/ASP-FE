import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/AdminIndexVue.vue')
    },
    {
      path: '/std',
      name: 'std',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Std/StdIndexVue.vue')
    },
    {
      path: '/std/assignments',
      name: 'assignments',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Std/StdAssignmentList.vue')
    }

  ]
})

export default router
