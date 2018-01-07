<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div><!--进度--->
      <div class="progress-btn-wrapper" ref="progressBtn"> <!--按钮--->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from "common/js/dom"

  const progressBtnWidth =16

  const transform =prefixStyle("transform")

  export default {
    name: ' ',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch:{
      percent(newPercent){
        if (newPercent >= 0) {
          const barWidth = this.$refs.progressBar.clientWidth  -progressBtnWidth
          const offsetWidth =newPercent*barWidth
          //进度线
          this.$refs.progress.style.width =`${offsetWidth}px`
          //设置小球的偏移
          this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`

        }
      }
    },
    data(){
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgba(0, 0, 0, 0.3)
      .progress
        position absolute
        height 100%
        background $color-theme
      .progress-btn-wrapper
        position absolute
        left -8px
        top -13px
        width 30px
        .progress-btn
          position relative
          top 7px
          left 7px
          box-sizing border-box
          width 16px
          height 16px
          border 3px solid $color-text
          border-radius 50%
          background $color-theme

</style>
