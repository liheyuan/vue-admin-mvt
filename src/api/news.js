import request from '@/utils/request'

export function create(data) {
  return request({
    url: 'api/news',
    method: 'post',
    data
  })
}
