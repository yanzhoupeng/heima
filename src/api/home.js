/**
 * home组件 接口开发
 *  getUserChennels 获取用户的频道
 *  getAllChennels 获取所有频道
 *  getChannelArt  获取当前频道所有文章
 *
 *  addUserChannels 添加用户频道
 *
 *  removeUserChannel 删除用户频道
 */

import request from '@/utils/request'

export const getUserChennels = () => {
  return request({
    url: 'v1_0/user/channels'
  })
}

export const getChannelArt = (params) => {
  return request({
    url: 'v1_0/articles',
    params
  })
}

export const getAllChennels = () => {
  return request({
    url: 'v1_0/channels'
  })
}

export const addUserChannels = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

export const removeUserChannel = (target) => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/channels/${target}`
  })
}
