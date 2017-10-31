// import * as types from './mutation-types'

const mutations = {
  getMovieHot (state, movie) {
    state.movie_hot = movie
  },
  getMovieSoon (state, movie) {
    state.movie_soon = movie
  }
}

export default mutations
