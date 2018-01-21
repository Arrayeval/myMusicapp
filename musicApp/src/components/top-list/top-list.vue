<template>
  <transition name="slide">

    <!--<music-list :title="title" :bg-image="bgImage"></music-list>-->
    <music-list   :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from "components/music-list/music-list"
  import {mapGetters} from "vuex"
  export default {
    computed:{
      ...mapGetters([
          "topList"
      ]),
      title(){
          return this.topList.topTitle;
      },
      bgImage(){
        return this.topList.picUrl
      }
    },
    created(){
        console.log("top-list created")
    },
    mounted(){
        console.log("mounted")
    },
    data () {
      return {}
    },
    components: {
      MusicList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition all 0.3s ease
  .slide-enter,.slider-leave-to
    transition translate3d(100%,0,0)

</style>
