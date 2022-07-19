import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由规则注册
const routes = [
  // login组件路由规则
  {
    path: '/login',
    // 命名路由
    name: 'Login',
    // 路由懒加载
    component: () => import('@/views/login/index'),
    meta: { title: '登录' }
  },

  // 主页
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    // 子路由规则
    children: [
      // 二级路由中加/会覆盖一级路由
      // 二级路由中不加/会和一级路由做拼接
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: 'qa',
        name: 'Qa',
        component: () => import('@/views/home/qa.vue')
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/home/video.vue')
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/home/my.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
