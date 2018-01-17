<template>
  <div>
    <scroll ref="scroll" class="recommend" :mydata="songList">
      <div>
        <div class="recommend-content">
          <div class="slider-wrapper" v-if="recommends.length">
            <!--轮播图组件--->
            <slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img class="needsclick" :src="item.picUrl" alt="" @load="loadImage">
                </a>
              </div>
            </slider>
          </div>

          <div class="recommend-list" v-if="songList.length">
            <h1 class="list-title">热门歌曲推荐</h1>
            <ul class="song-list">
              <li @click="selectItem(item)" v-for="item in songList" class="list-item">
                <div class="icon">
                  <!--<img width="60" height="60" :src= "item.picUrl">-->
                  <img width="60" height="60" v-lazy="item.picUrl">
                </div>
                <div class="text">
                  <h2 class="name">{{item.songListAuthor}}</h2>
                  <p class="desc">{{item.songListDesc}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!songList.length">
          <loading></loading>
        </div>
      </div>

    </scroll>
    <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">

  import Scroll from 'base/scroll/scroll'

  //轮播图组件
  import Slider from 'base/slider/slider'

  //loading组件
  import loading from 'base/loading/loading'

  //倒入api
  import {getRecommend, getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'

  import {playListMixin} from "common/js/mixin"

  import {mapMutations} from "vuex"

  export default {
    //name: ' ',
    mixins: [playListMixin],
    created(){
      this._getRecommend();
      //  this._getDiscList();
    },
    methods: {
      handelPlayList(playList){
        const bottom = playList.length > 0 ? "60px" : '';
        this.$refs.scroll.$el.style.bottom = bottom;//设置底部距离
        this.$refs.scroll.refresh();   //重新渲染
      },

      _getRecommend(){
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            //  console.log(res.data);
            this.recommends = res.data.slider;//轮播专栏
            this.songList = res.data.songList;//热门歌单
            this.radioList = res.data.radioList;//电台
          }
        });
      },

      loadImage(){
        if (!this.checkloaded) {
          this.$refs.scroll.refresh();
          this.checkloaded = true;
        }
      },

      selectItem(item){
          console.log(item);
          this.$router.push({
            path:`/recommend/${item.id}`,
          });
          this.setDisc(item);//vuex状态存储

      },

      ...mapMutations({
        setDisc:"SET_DISC"
      })
//      _getDiscList(){
//          getDiscList().then((res)=>{
//             if(res.code === ERR_OK){
//                 console.log(res.data);
//             }
//          });
//      }

    },
    data () {
      return {
        recommends: [],
        radioList: [],
        songList: []
      }
    },
    components: {
      Slider,
      Scroll,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .recommend
    position fixed
    width 100%
    top 60px
    bottom 0
    z-index -100
    .recommend-content
      height 100%
      overflow hidden
      .recommend-list
        .list-title
          height 65px
          line-height 65px
          text-align center
          font-size $font-size-medium
          color $color-theme;
          margin 10px auto
        .song-list
          .list-item
            display flex
            box-sizing border-box
            align-items center
            padding 0 20px 20px 20px
            .icon
              flex 60px 0 0
              width 60px
              padding-right 20px
            .text
              display flex
              flex-direction column
              justify-content center
              flex 1
              font-size $font-size-small
              line-height 20px
              overflow hidden
              .name
                margin-bottom 10px
                color $color-text
              .desc
                color $color-text-d

    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
