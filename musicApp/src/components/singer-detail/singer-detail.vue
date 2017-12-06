<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex"
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  export default {
    name: ' ',
    data () {
      return {}
    },
    computed: {
      //vux
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      //console.log(this.singer)
      this._getDetail();
    },
    methods: {
      _getDetail(){
        if (!this.singer.id) {
          /*
           *vux(点击歌手，set state[状态])，所以如果我么直接在歌手详情页刷新是获取不到数据this.singer
           *如果用户在当前页面刷新是获取不到singer的，这个时候我们就要让他回退
           */
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res);
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail
    position: fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background

  .slide-enter-active, .slider-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
