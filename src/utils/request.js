/**
 * 封装axios方法
 *  只定义了基准路径的ajax请求 request
 */

import axios from 'axios'
import store from '@/store'

// 创建axios实例：便于使用不同接口
const request = axios.create({
  // 基准路径
  baseURL: 'http://toutiao.itheima.net/'
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
