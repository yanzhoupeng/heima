/**
 * 封装my页面所需的接口
 *  getUserMsg 获取用户资料
 */

import request from '@/utils/request'

export const getUserMsg = () => {
  return request({
    url: 'v1_0/user'
  })
}
