<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage">

    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from "components/music-list/music-list"

  import {mapGetters} from "vuex"

  import {ERR_OK} from "../../api/config"
  //import {getSongList} from "../../api/getSongList"
  import {getSongList} from "../../api/recommend"

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
    },

    created(){
      this._getSongList();
    },
    methods: {
      _getSongList(){
//        getSongList(this.disc.id).then((res)=>{
//          console.log(res)
//        })
        console.log(this.disc);
        getSongList(this.disc.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
          }

        })
      }
    },
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
