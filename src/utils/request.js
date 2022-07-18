/**
 * 封装axios方法
 *  只定义了基准路径的ajax请求 request
 */

import axios from 'axios'

// 创建axios实例：便于使用不同接口
const request = axios.create({
  // 基准路径
  baseURL: 'http://toutiao.itheima.net/'
})

export default request
