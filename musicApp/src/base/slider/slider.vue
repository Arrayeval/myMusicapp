<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item , index) in dots" :class="{active:currentPageIndex == index}">{{index}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //引入better-scroll插件
  import BScroll from 'better-scroll'

  import {addClass, hasClass} from 'common/js/dom'
  //自动轮播、循环轮播、设置轮播的间隔
  export default {
 //   name: ' ',
    data () {
      return {
        dots: [],//点
        currentPageIndex: 0,

      }
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
      },

    },

    mounted(){
      setTimeout(() => {
        //定义宽度
        this._setSliderWidth();

        //设置dot
        this._initDots();

        //自动播放
        if (this.autoPlay) {
          this._play();
        }

        //初始化better-scroll
        this._initSlider();
      }, 20);

      //监听窗口的大小“重置better-scroll”
      window.addEventListener("resize", () => {
        if (!this.slider) {
          return 0;
        }
        this._setSliderWidth(true);
        this.slider.refresh();//刷新
      })
    },
    destroyed(){
      //在组件被切换（使用生命周期结束时候，要做一些清楚工作）
      clearTimeout(this.timer);
    },
    methods: {
      _setSliderWidth(isRefresh){
        //子元素集合
        this.children = this.$refs.sliderGroup.children;
        // debugger;
        //console.log(this.children.length);
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
        if (this.loop && !isRefresh) {//isRefresh避免重复加sliderWidth
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots(){
        this.dots = new Array(this.children.length);
      },
      _initSlider(){
        //初始化BETTER-scroll
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
//          snap: true,
//          snapLoop: this.loop,
//          snapThreshold:0.3,
//          snapSpeed:400,
          //  click:true
        });

        //获得当前页
        this.slider.on("scrollEnd", () => {
          //返回当前的pageX
          //pageX 和 pageY 表示横轴方向和纵轴方向的页面数。
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {//如果是循环就需要减去拷贝的一份
            pageIndex -= 1;
          }
          this.currentPageIndex = pageIndex;

          if (this.autoPlay) {
            //每次滚动之前都要进行清空
            clearTimeout(this.timer);
            this._play();
          }
        });

      },
      _play(){
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400);
        }, this.interval);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height 1px
    position relative
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
        &.active
          width 20px
          border-radius 5px
          background-color $color-text-ll
</style>
