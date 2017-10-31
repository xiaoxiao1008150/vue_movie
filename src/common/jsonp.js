import originJsonp from 'jsonp'

let baseUrl = 'https://api.douban.com/v2/'

export default function jsonp (url, option) {
  url = baseUrl + url
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// export function param(data) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//     // `&${k}=${encodeURIComponent(value)}`
//   }
//   return url ? url.substring(1) : ''
// }
