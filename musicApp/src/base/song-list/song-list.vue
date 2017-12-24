<template>
  <div class="song-list">
    <ul>
      <li v-for="(song,index) in song" class="item" @click="selectItem(song,index)">
        <div class="content">
          <h2 class="name" v-text="song.name"></h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    props: {
      song: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      getDesc(song){
        return `${song.singer}-${song.album}`
      },
      selectItem(item,index){
        this.$emit('select',item,index)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .rank
        flex 0 0 25px
        width 25px
        margin-right 30px
        text-align center
        .icon
          display inline-block
          width 25px
          height 24px
          background-size 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            ng-image('third')
        .text
          color $color-theme
          font-size $font-size-large
      .content
        flex 1
        line-height 20px
        overflow hidden

        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-text-d

</style>
