<template>
  <scroll class="list-view" :data="data" ref="listview">
    <ul class="list-item">
      <li v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
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
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index" ref="listGroup">
          {{item}}
        </li>

      </ul>
    </div>


  </scroll>

</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll/scroll"

  import {getData} from 'common/js/dom'

  const ANCHOR_HEIGHT = 18;//每个字母的高度
  export default {
    name: ' ',
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    created(){
      //不再data中创建属性是因为这个数据不需要观测
      this.touch = {}
    },
    data () {
      return {}
    },
    computed: {
      shortcutList(){
        return this.data.map((group) => {
          // console.log(group.title);
          return group.title.substr(0, 1);

        })

      }
    },

    components: {
      Scroll
    },
    watch: {
      data(val, old){
        //  console.log(Object.prototype.toString.call(val));
        console.log(val);
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
        this.touch.anchorIndex =anchorIndex ;

      },

      //滚动
      onShortcutTouchMove(e){
        //获得滑动过程中字母所在的pageY值
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        //计算差值,异或0 向下取整
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;

        //最终目的地
        let anchorIndex =this.touch.anchorIndex + delta;
        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
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
</style>
