/**
 * search 组件
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
