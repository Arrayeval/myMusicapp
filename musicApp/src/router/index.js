import Vue from 'vue'
import Router from 'vue-router'

// import Recommend from '../components/recommend/recommend'
// import Singer from '../components/singer/singer'
// import Rank from '../components/rank/rank'
// import Search from '../components/search/search'
// import SingerDetail from '../components/singer-detail/singer-detail'
// import Disc from '../components/disc/disc'
// import TopList from "../components/top-list/top-list.vue"

//路由懒加载（按需加载，这样可以减小app.js的文件大小，这是一个很好的优化点）
const Recommend =()=> import('../components/recommend/recommend')
const Singer =()=> import('../components/singer/singer')
const Rank =()=> import('../components/rank/rank')
const Search =()=> import('../components/search/search')
const SingerDetail =()=> import( '../components/singer-detail/singer-detail')
const Disc =()=> import('../components/disc/disc')
const TopList =()=> import("../components/top-list/top-list.vue")

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
