<template>
  <transition name="droop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: ' ',
    data () {
      return {
        showFlag: false
      }
    },
    props: {
      delay: {
        type: Number,
        default: 2000,
      }
    },
    methods: {
      show(){
        this.showFlag = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.hide();
        }, thhis.delay);
      },
      hide(){
        this.showFlag = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .top-tip
    position fixed
    top 0
    width 100%
    z-index 500
    background $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition all 0.3s
    &.drop-enter, &.drop-leave-to
      transition translate(0, -100%, 0)
</style>
