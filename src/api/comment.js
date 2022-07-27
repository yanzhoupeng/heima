/**
 * comment 评论接口
 *  getComments 获取评论
 */

import request from '@/utils/request.js'

export const getComments = (params) =>
  request({
    url: 'v1_0/comments',
    params
  })
