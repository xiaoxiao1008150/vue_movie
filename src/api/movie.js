import http from './axios'

// 获取全即将上映电影 默认20条数据
export const _getComingSoon = (params) => {
  return http.fetchGet('/api/movie/coming_soon', params)
}
// 正在热映
export const _getHot = (params) => {
  return http.fetchGet('/api/movie/in_theaters', params)
}
