<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div><!--进度--->
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd"
      > <!--按钮--->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from "common/js/dom"

  const progressBtnWidth = 16

  const transform = prefixStyle("transform")

  export default {
  //  name: ' ',
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent){
        if (newPercent >= 0 && !this.initiated) {//&& this.initiated表示没有拖动
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          /*
           //进度线
           this.$refs.progress.style.width = `${offsetWidth}px`
           //设置小球的偏移
           this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
           */
          this._offset(offsetWidth);
        }
      }
    },
    data(){
      return {}
    },
    created(){
      this.touch = {};

    },
    methods: {
      _offset(offsetWidth){
        //进度线
        this.$refs.progress.style.width = `${offsetWidth}px`
        //设置小球的偏移
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      },

      progressTouchStart(e){
        this.touch.initiated = true;
        console.log(e)
        this.touch.startX = e.touches[0].pageX;//初始位置
        this.touch.left = this.$refs.progress.clientWidth;//当前进度

      },
      progressTouchMove(e){
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX;//获得最新偏移

        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,
          Math.max(0, this.touch.left + deltaX));

        this._offset(offsetWidth);
      },
      progressTouchEnd(e){
        this.touch.initiated = false;
        //派发事件
        this._triggerPercent()

      },
      _triggerPercent(){
          //整个进度条的总长度
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
          //利用实际进度除以进度条的总长
        const percent = this.$refs.progress.clientWidth / barWidth;
        //派发事件（告诉外界状态已经改变）
        this.$emit("percentChange",percent)
      },
      //进度播放()
      progressClick(e){
         // this._offset(e.offsetX);
        //  this._triggerPercent();
        //这里点击progressBtn的时候，e.offsetX获取不对
        const rect = this.$refs.progressBar.getBoundingClientRect();//获得元素距离屏幕的左边距离
        const offsetWidth = e.pageX -rect.left;
        this._offset(offsetWidth);
        this._triggerPercent();
      }
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
