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
    name: 'Tab-tar',
    component: () => import('@/views/index.vue'),
    // 挂载子路由
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/layout/home.vue')
      },
      {
        path: 'qa',
        name: 'Qa',
        component: () => import('@/views/layout/qa.vue')
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/layout/video.vue')
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/layout/my.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
