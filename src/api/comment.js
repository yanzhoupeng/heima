/**
 * comment 评论接口
 *  getComments 获取评论 全部评论/楼中楼
 */

import request from '@/utils/request.js'

export const getComments = (params) =>
  request({
    url: 'v1_0/comments',
    params
  })

export const likeComment = (target) =>
  request({
    method: 'POST',
    url: 'v1_0/comment/likings',
    data: {
      target
    }
  })

export const canelLikeComment = (target) =>
  request({
    method: 'DELETE',
    url: `v1_0/comment/likings/${target}`
  })

export const addComment = (data) =>
  request({
    method: 'POST',
    url: 'v1_0/comments',
    data
  })
