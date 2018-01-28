import Vue from 'vue'
import Router from 'vue-router'

import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank'
import Search from '../components/search/search'

import SingerDetail from '../components/singer-detail/singer-detail'

import Disc from '../components/disc/disc'
import TopList from "../components/top-list/top-list.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend',
    },
    {
      path:'/recommend',
      component:Recommend,
      name:'recommend',
      children:[{
        path:":id",
        component:Disc
      }]
    },
    {
      path:'/singer',
      component:Singer,
      name:'singer',
      children:[
        {
          path:':id',
          component:SingerDetail,
          name:'singerDetail'
        },
      ]
    },
    {
      path:'/rank',
      component:Rank,
      name:'rank',
      children:[{
        path: ":id",
        component: TopList,
        name: 'TopList'
      }]


    },
    {
      path:'/search',
      component:Search,
      name:'search',
      children:[{
        path:":id",
        component:SingerDetail,
        name:"SingerDetail"
      }]
    },

  ]
})
