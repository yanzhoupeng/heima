/**
 * 封装login界面 网络请求方法
 *  登录 postUserMsg
 *  验证码 getCode
 */

// 引入axios请求函数
import request from '@/utils/request'

// 登录
export const postUserMsg = (data) => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}

// 获取验证码
export const getCode = (mobile) => {
  return request({
    url: `v1_0/sms/codes/${mobile}`
  })
}
