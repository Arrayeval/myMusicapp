<template>
  <transition name="slide">

    <!--<music-list :title="title" :bg-image="bgImage"></music-list>-->
    <music-list :title="title" :bg-image="bgImage" :song="songs" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from "components/music-list/music-list"
  import {mapGetters} from "vuex"
  import {getMusicList} from  '../../api/rank'
  import {ERR_OK} from "../../api/config"
  import {createSong} from "common/js/song"
  export default {
    computed: {
      ...mapGetters([
        "topList"
      ]),
      title(){
        return this.topList.topTitle;
      },
      bgImage(){
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ""
      }
    },
    created(){
      this._getMusicList();
    },

    data () {
      return {
        songs: [],
        rank:true,
      }
    },
    components: {
      MusicList
    },
    methods: {
      _getMusicList(){
        if (!this.topList.id) {//页面刷新，vuex中的记录会丢失，故没有id
          this.$router.push("/rank");
          return
        }
      //  console.log(this.topList)
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        });
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((item) => {
          const musicData = item.data;
          if (musicData.albummid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        });
        return ret;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition all 0.3s ease

  .slide-enter, .slider-leave-to
    transition translate3d(100%, 0, 0)

</style>
