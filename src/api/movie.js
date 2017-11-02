import http from './axios'

// 获取全即将上映电影 默认20条数据
export const _getComingSoon = (query, params) => {
  return http.fetchGet(`/api/movie/coming_soon?${query}`, params)
}
// 正在热映
export const _getHot = (query, params) => {
  return http.fetchGet(`/api/movie/in_theaters?${query}`, params)
}

// 获取一个电影详细信息
export const _getSingleMovie = (param, params) => {
  return http.fetchGet(`/api/movie/subject/${param}`, params)
}
