import request from '@/utils/request'

export function createNews(data) {
  return request({
    url: 'api/news',
    method: 'post',
    data
  })
}

export function updateNews(data) {
  return request({
    url: 'api/news',
    method: 'put',
    data
  })
}

export function getNews(id) {
  return request({
    url: 'api/news/' + id,
    method: 'get'
  })
}
