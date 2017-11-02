import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Movies from 'components/Movies'
// import Tab from 'base/Tab'
import Detail from 'components/Detail'

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
    }
  ]
})
