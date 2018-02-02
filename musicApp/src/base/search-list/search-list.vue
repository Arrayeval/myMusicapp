<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li @click="selectItem(item)" class="search-item" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
            <i class="icon-delete"></i>
          </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: {
      searches: {
        types: Array,
        default: []
      }
    },
    methods: {
      selectItem(item){
        this.$emit("select", item);
      },
      deleteOne(item){
          this.$emit("delete",item);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-list
    .search-item
      display flex
      align-item center
      height 40px
      .text
        flex 1
        color $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size $font-size-samll
          color $color-text-d
</style>
