/**
 * article 接口
 *
 *  getArticleById 通过id获取文章详情
 *
 *  followUser 关注用户
 *  cannelFollowUser 取消关注用户
 */

import request from '@/utils/request'

export const getArticleById = (articleId) =>
  request({
    url: `v1_0/articles/${articleId}`
  })

export const followUser = (target) =>
  request({
    method: 'POST',
    url: 'v1_0/user/followings',
    data: {
      target
    }
  })

export const cannelFollowUser = (target) =>
  request({
    method: 'DELETE',
    url: `v1_0/user/followings/${target}`
  })
