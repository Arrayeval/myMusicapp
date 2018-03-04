/**
 * Created by Administrator on 2018/1/15 0015.
 */
import  {mapGetters,mapMutations,mapActions}  from "vuex"
import playMode from "common/js/config"
import {shuffle} from "common/js/util"
export const playListMixin={
  computed:{
    ...mapGetters([
      'playList'
    ])
  },

  //vue组件被挂载的时候
  mounted(){
    this.handelPlayList(this.playList)
  },
  //keep-alive组件切换的时候
  activated(){
    this.handelPlayList(this.playList)
  },
  watch:{
    playList(newVal){
      this.handelPlayList(newVal)
    }
  },
  methods:{
    handelPlayList(){
      throw new Error("component must implement handelPlayList method")
    }
  }

};

export const playerMixin ={
  computed:{
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode'
    ]),
    iconMode(){
      //  console.log(playMode)
      return this.mode === playMode.sequence ? "icon-sequence" : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
  },
  methods:{
    //播放状态
    changeMode(){
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      //更该变播放列表
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      }
      else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    //找到当前的歌曲索引
    resetCurrentIndex(list, song){
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    //暂停（播放）
    toggle_playing(tag){
      if (tag === false) {
        this.setPlayingState(tag);
        return
      }
      this.setPlayingState(!this.playing);
      //是否暂停歌曲的播放
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },

    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    })
  },

};

export const searchMixin ={
  data(){
    return {
      query:""
    }
  },
  computed:{
    ...mapGetters([
      "searchHistory"
    ]),
  },
  methods:{
    onQueryChange(query){
      this.query = query
    },
    blurInput(){
      this.$refs.searchBox.blur()
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query);
    },
    ...mapActions([
      'saveSearchHistory',
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  }
}
