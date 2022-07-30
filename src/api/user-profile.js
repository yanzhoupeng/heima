/**
 * 编辑用户资料 接口
 *
 *  getUserMessage 获得用户信息
 *
 *  changeUserMessage 更新用户信息
 */

import request from '@/utils/request'

export const getUserMessage = () =>
  request({
    url: 'v1_0/user/profile'
  })

export const changeUserMessage = (data) =>
  request({
    method: 'PATCH',
    url: 'v1_0/user/profile',
    data
  })
