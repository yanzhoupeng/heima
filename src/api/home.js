/**
 * home组件 接口开发
 *  getAllChennels 获取所有频道
 *  getChannelArt  获取当前频道所有文章
 */

import request from '@/utils/request'

export const getAllChennels = () => {
  return request({
    url: 'v1_0/channels'
  })
}

export const getChannelArt = (params) => {
  return request({
    url: 'v1_0/articles',
    params
  })
}
