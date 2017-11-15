import http from './axios'
let baseUrl = 'http://localhost:8080'
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://47.104.98.140:8000'
}

let API_KEY = 'apikey=0b2bdeda43b5688921839c8ecb20399b'
function helpUrl (query) {
  let baseQuery = 'apikey=0b2bdeda43b5688921839c8ecb20399b&count=10&'
  if (query) {
    baseQuery = baseQuery + query
  }
  return baseQuery
}

// 搜索电影 根据关键词 电影名 人物
export const _getInfo = (key, query, params) => {
  return http.fetchGet(baseUrl + `/api/movie/search?q=${key}&` + helpUrl(query), params)
}
// 获取全即将上映电影 默认20条数据
export const _getComingSoon = (query, params) => {
  return http.fetchGet(baseUrl + `/api/movie/coming_soon?` + helpUrl(query), params)
}
// 正在热映
export const _getHot = (query, params) => {
  return http.fetchGet(baseUrl + `/api/movie/in_theaters?` + helpUrl(query), params)
}

// 获取一个电影详细信息
export const _getSingleMovie = (id, params) => {
  return http.fetchGet(baseUrl + `/api/movie/subject/${id}?` + API_KEY, params)
}
// 获取一个电影的剧照
export const _getMoviePhotoes = (id, params) => {
  return http.fetchGet(baseUrl + `/api/movie/subject/${id}/photos?` + helpUrl(), params)
}
// 获取一个电影的短评
export const _getMovieReviews = (id, query, params) => {
  return http.fetchGet(baseUrl + `/api/movie/subject/${id}/reviews?` + helpUrl(query), params)
}
