<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //引入better-scroll插件
  import BScroll from 'better-scroll'

  import {addClass, hasClass} from 'common/js/dom'
  //自动轮播、循环轮播、设置轮播的间隔
  export default {
    name: ' ',
    data () {
      return {}
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },

    mounted(){
      setTimeout(() => {
        this._setSliderWidth();
        this._initSlider();
      }, 20)
    },
    methods: {
      _setSliderWidth(){
        //子元素集合
        this.children = this.$refs.sliderGroup.children;

        let width = 0;
        //父容器的宽度
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');
          //设置每个子元素的宽度为父元素的宽度
          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        //如果是循环轮播()
        if (this.loop) {
         width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initSlider(){
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop ||true,
          snapThreshold:0.3,
          snapSpeed:400,
          click:true
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align cemter
        a
          display inline-block
          width 100%
          overflow hidden
          text-decoration none
        img
          display block
          width 100%

    .dots
      position absolute
      right 0
      left 0
      bottom 12px
      text-align center
      font-size 0
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background $color-text-ll
</style>
