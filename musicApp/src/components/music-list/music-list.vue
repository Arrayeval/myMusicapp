<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper" @click="random">
        <div class="play" v-show="song.length>0" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType"
            :listen-scroll="listenScroll" :data="song" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :song="song" @select="selectItem"></song-list>
      </div>
      <div class="loading-container" v-show="!song.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from "base/song-list/song-list"
  const RESERVED_HEIGHT = 40

  import {prefixStyle} from 'common/js/dom'

  import Loading from 'base/loading/loading'

  import {mapActions} from "vuex"

  import {playListMixin} from "common/js/mixin"

  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('backdrop-filter');

  export default {
    //name: ' ',
    mixins: [playListMixin],

    props: {
      bgImage: {
        type: String,
        default: ''
      },
      song: {
        type: Array,
        default: function () {
          return [];
        }
      },
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    created(){
      this.probeType = 3;
      this.listenScroll = true;
    },
    mounted(){
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`;
      // console.log(this.$refs.list)
    },
    methods: {
      //组件里的方法会覆盖mixin的同名函数方法
      handelPlayList(playList){
        const bottom = playList.length>0? "60px":'';
        this.$refs.list.$el.style.bottom =bottom ;//设置底部距离
        this.$refs.list.refresh();   //重新渲染
      },


      scroll(pos){
        this.scrollY = pos.y
      },
      back(){
        this.$router.back()
      },

      /*
       * 响应song-list的派发事件
       * */
      selectItem(item, index){//item：当前点击的歌曲,index:歌曲索引
        this.selectPlay({
          list: this.song,//歌曲列表数据
          index: index
        })
      },

      random(){
        this.randomPlay({
          list: this.song
        })
      },

      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY(newY){
        //防止滚动超出
        let translateY = Math.max(this.minTranslateY, newY);
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        //this.$refs.layer.style.webkitTransform = `translate3d(0,${translateY}px,0)`

        let zIndex = 0;
        if (newY < this.minTranslateY) {
          zIndex = 10;
          this.$refs.bgImage.style.paddingTop = 0;
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
          //随机播放按钮消失
          this.$refs.playBtn.style.display = 'none';

        }
        else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.height = 0;
          this.$refs.playBtn.style.display = '';

        }
        this.$refs.bgImage.style.zIndex = zIndex;


        /**
         * 设置下拉图片放大/制作高斯模糊
         * **/
        let scale = 1;
        let blur = 0;
        const percent = Math.abs(newY / this.imageHeight);
        if (newY > 0) {
          scale = 1 + percent;
          zIndex = 10
        }
        else {
          blur = Math.min(20 * percent, 20)


        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`;
        //    this.$refs.bgImage.style['webkitTransform']=`scale(${scale})`;

        this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
        //   this.$refs.filter.style['webkit-backdrop-filter']=`blur(${blur}px)`;

      }
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)


</style>
