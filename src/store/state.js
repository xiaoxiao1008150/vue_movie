import {loadSearch} from 'common/js/storage'

const state = {
  cityname: '上海',
  com_movie: [],
  current_movie: '',
  routerActive: 1,
  search_history: loadSearch()
}
export default state
