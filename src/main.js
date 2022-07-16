import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 移动端适配方案
import 'amfe-flexible'
// 引入less
import '@/styles/index.less'
// 引入字体图标
import '@/assets/iconfont/iconfont.css'

// vant全部导入
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
