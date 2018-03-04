<template>
  <ul class="switches">
    <li class="switch-item" v-for="(item,index) in switches" :class="{'active':currentIndex ===index}" @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'switchItem',
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    methods:{
      switchItem(index){
          this.$emit("switchItem",index);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .switches
    display flex
    align-items center
    width 240px
    margin 0 auto
    border 1px solid $color-highlight-background
    border-radius 5px
    .switch-item
      flex 1
      padding 8px
      text-align center
      font-size $font-size-medium
      color $color-text-d
      &.active
        background $color-highlight-background
        color $color-text
</style>
