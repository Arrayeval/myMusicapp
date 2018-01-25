<template>
  <div ref="wrapper">
    <slot>

    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  export default {
    //  name: ' ',
    data () {
      return {}
    },
    props: {
      probeType: {//滚动
        type: Number,
        default: 1
      },
      click: {//能否点击
        type: Boolean,
        default: true
      },
      mydata: {//数据传输
        type: Array,
        default: function () {
          return [];
        }
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default:false,
      }
    },
    mounted(){
      setTimeout(() => {
        this._initScroll();
      }, 2000)
    },
    methods: {
      //初始化better-scroll
      _initScroll(){
        if (!this.$refs.wrapper) {
          return 0;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
        });

        //监听滚动事件（在初始化的时候就需要监听）
        if (this.listenScroll) {
          let me = this;
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos);
          });
        }
        /*
        * 下拉刷新
        * */
        if(this.pullup){
            this.scroll.on("scrollEnd",()=>{
                if(this.scroll.y <=(this.scroll.maxScrollY +50)){
                    this.$emit("scrollToEnd");
                }
            })
        }
      },
      enable(){
        this.scroll && this.scroll.enable();
      },
      disable(){
        this.scroll && this.scroll.disable();
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement(){//使用apply的作用是，可能会传入参数，要强制改变this的指向
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      },

      watch: {
        //监听数据的改变，重新渲染DOM
        mydata(val, oldVal){
          setTimeout(() => {
            this.refresh()
          }, 20)
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
