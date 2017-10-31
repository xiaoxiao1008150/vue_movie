import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import Movies from 'components/Movies'
import Tab from 'base/Tab'

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
      path: '/tab',
      name: 'tab',
      component: Tab
    }
  ]
})
