/**
 * my组件 接口开发
 *  getUserMsg 获取用户资料
 */

import request from '@/utils/request'

export const getUserMsg = () => {
  return request({
    url: 'v1_0/user'
  })
}
