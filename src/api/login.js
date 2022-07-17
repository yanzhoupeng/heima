import request from '@/utils/request'

// 登录接口
export const postUserMsg = (params) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    params
  })
}

// 获取验证码接口
export const getCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
