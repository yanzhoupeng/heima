import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 移动端适配方案
import 'amfe-flexible'
// 引入css样式
import '@/css/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
