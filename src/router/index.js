import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/general'
    },
    {
      path: '/general',
      name: 'general',
      component: () => import('../views/GeneralView.vue'),
      meta: {
        title: '通用处理'
      }
    },
    {
      path: '/compare',
      name: 'compare', 
      component: () => import('../views/CompareView.vue'),
      meta: {
        title: '差异对比'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/general'
    }
  ],
})

/**
 * 路由守卫 - 设置页面标题
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta?.title) {
    document.title = `${to.meta.title} - 差异对比系统`
  } else {
    document.title = '差异对比系统'
  }
  next()
})

export default router 