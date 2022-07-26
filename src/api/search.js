/**
 * search 组件
 *
 *  getSearchSuggest 获取搜索建议
 *  getSearchResult 获取搜索结果
 */

import request from '@/utils/request'

export const getSearchSuggest = (q) =>
  request({
    url: 'v1_0/suggestion',
    params: { q }
  })

export const getSearchResult = (params) =>
  request({
    url: 'v1_0/search',
    params
  })
