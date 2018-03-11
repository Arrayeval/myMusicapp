<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper"></div>
      <div ref="playBtn" class="play-btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        name: ' ',
        data () {
            return {}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
