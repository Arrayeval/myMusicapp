<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper"  v-if="recommends.length">
        <!--轮播图组件--->
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌曲推荐</h1>
        <ul>

        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  //轮播图组件
  import Slider from 'base/slider/slider'

  import {getRecommend} from '../../api/recommend'
  import { ERR_OK } from '../../api/config'

  export default {
    name: ' ',
    created(){
      this._getRecommend();
    },
    methods:{
      _getRecommend(){
          getRecommend().then((res)=>{
              if(res.code===ERR_OK){
                 // console.log(res.data.slider);
                  this.recommends =  res.data.slider;
              }
          });
      }
    },
    data () {
      return {
          recommends:[]
      }
    },
    components:{
        Slider,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
