<template>
  <scroll class="list-view" :mydata="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType"
          @scroll="scroll"
  >
    <ul class="list-item">
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <!--<img class="avatar" :src="item.avatar" alt="">-->
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!---左侧字母快速入口--->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index"
            :class="{'current':currentIndex===index}"
        >
          {{item}}
        </li>
      </ul>
    </div>

    <!--top fixed-->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>

    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>

</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll/scroll"

  import {getData} from 'common/js/dom'

  import Loading from "base/loading/loading"

  const ANCHOR_HEIGHT = 18;//每个字母的高度
  const TITLE_HEIGHT = 30;
  export default {
  //  name: ' ',
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      },
      probeType: {
        type: Number,
        default: 3
      }
    },
    created(){
      //不再data中创建属性是因为这个数据不需要观测
      this.touch = {},
        this.listenScroll = true
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        listHeight: 0,
        diff: -1
      }
    },
    computed: {
      shortcutList(){
        //权宜之计
        setTimeout(() => {
          this._calculateHeight();
        }, 20);

        return this.data.map((group) => {
          // console.log(group.title);
          return group.title.substr(0, 1);
        })

      },
      fixedTitle(){//fixed tile
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },

    components: {
      Scroll,
      Loading
    },
    watch: {
      /* TODO:v-if使得这个监听没用
       data(val){
       console.log(Object.prototype.toString.call(val));
       console.log(val);
       setTimeout(() => {
       this._calculateHeight();
       }, 20);
       },
       */
      scrollY(newY){
        const listHeight = this.listHeight

        //当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0;
          return;
        }

        //中间部分滚动
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {//向下拉pageY<0 ,"为了比较大小就需要使用-负号"
            this.currentIndex = i;
            //用于fixedTitle
            this.diff = height2 + newY;
            //   console.log( this.currentIndex );
            return
          }
        }
        //滚动到底部，且-newY 大于最后一个元素的上限
        this.currentIndex = 0;
      },

      diff(newVal){
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop == fixedTop) {
              return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },

    methods: {
      onShortcutTouchStart(e){
        let anchorIndex = getData(e.target, 'index');
        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
        //  console.log("%c %s %s %s","color:yellow;background-color:black",'-',msg,'-');
        //   console.log(this.$refs.listGroup[anchorIndex]);

        //console.log(e);
        //获的起始点击字母的pageY值
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;

        //记录在开始滑动的时候所触碰的是第几个字母
        this.touch.anchorIndex = anchorIndex;

      },

      //滚动
      onShortcutTouchMove(e){
        //获得滑动过程中字母所在的pageY值
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        //计算差值,异或0 向下取整
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;

        //最终目的地
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 300)
      },

      //获取滚动距离
      scroll(pos){
        this.scrollY = pos.y
      },

      //生成一个数组存储所有的listGroup的元素的高度，高亮遍历
      _calculateHeight(){
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        // console.log(this.listHeight);
      },

      selectItem(item){
          this.$emit("select",item)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .list-view
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-item
      .list-group
        padding-bottom 30px
        .list-group-title
          height 30px
          line-height 30px
          padding-left 20px
          font-size $font-size-small
          color $color-text-l
          background $color-highlight-background
        .list-group-item
          display flex
          align-items center
          padding 20px 0 0 30px
          .avatar
            width 50px
            height 50px
            border-radius 50%
          .name
            margin-left 20px
            color $color-text-l
            font-size $font-size-medium

    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme
    .list-fixed
      position absolute
      top -1px
      left 0
      width 100%
    .fixed-title
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #333;
</style>
