import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank'
import Search from '../components/search/search'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend',

    },
    {
      path:'/recommend',
      component:Recommend,
      name:'recommend'
    },
    {
      path:'/singer',
      component:Singer,
      name:'singer'
    },
    {
      path:'/rank',
      component:Rank,
      name:'rank'
    },
    {
      path:'/search',
      component:Search,
      name:'search'
    },

  ]
})
