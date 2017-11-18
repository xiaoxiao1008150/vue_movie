import {saveSearch, deleteSearch} from 'common/js/storage'

const mutations = {
  setCityName (state, cityname) {
    state.cityname = cityname
  },
  setComMovie (state, movie) {
    state.com_movie = movie
  },
  setCurrentMovie (state, movie) {
    state.current_movie = movie
  },
  saveSearch (state, searchword) {
    state.search_history = saveSearch(searchword)
  },
  delateSearch (state, searchword) {
    state.search_history = deleteSearch(searchword)
  },
  setRouterActive (state, flag) {
    state.routerActive = flag
  }
}

export default mutations
