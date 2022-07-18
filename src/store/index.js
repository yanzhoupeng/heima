/**
 * VueX
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 引入本地存储方法
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息 token refresh_token
    user: getItem('TOKEN_KEY')
  },

  mutations: {
    // 初始化用户信息
    setUserInfo(state, info) {
      state.user = info

      setItem('TOKEN_KEY', state.user)
    }
  },
  actions: {},
  modules: {},
  getters: {}
})
