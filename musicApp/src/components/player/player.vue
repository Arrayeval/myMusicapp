<template>
  <div class="player" v-show="playList.length>0">
    <!---正常的播放器-->
    <div class="normal-player"  v-show="fullScreen">
      播放器
    </div>
    <!--缩放后的播放器-->
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'


  export default {
    name: ' ',
    data () {
      return {}
    },

    computed:{
      ...mapGetters([
        'fullScreen',
        'playList',

      ])
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 150
    background $color-background
</style>
