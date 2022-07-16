import request from '@/utils/request'

export const postUserMsg = (params) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    params
  })
}
