import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Movies from 'components/Movies'
import Detail from 'components/Detail'
import Reviews from 'components/Reviews'
import City from 'components/City'
import SearchList from 'components/SearchList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movie/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/reviews/:id',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/city-list',
      name: 'city-list',
      component: City
    },
    {
      path: '/search-list/:key',
      name: 'search-list',
      component: SearchList
    }
  ]
})
