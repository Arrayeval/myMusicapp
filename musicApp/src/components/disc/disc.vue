<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage">

    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from "components/music-list/music-list"

  import {mapGetters} from "vuex"

  export default {
    name: 'disc',
    computed: {
      title(){
          return this.disc.songListDesc;
      },
      bgImage(){
        return this.disc.picUrl;
      },

      ...mapGetters([
        'disc'
      ])
    },
    data()
    {
      return {}
    }
    ,
    components: {
      MusicList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition all 0.3s

  .slide-enter, .slide-leave-to
    transition translated3d(100%, 0, 0)


</style>
