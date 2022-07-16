import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由规则注册
const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/index'
  },
  // login组件路由规则
  {
    path: '/login',
    // 命名路由
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login/index'),
    meta: { title: '登录' }
  }
]

const router = new VueRouter({
  routes
})

export default router
