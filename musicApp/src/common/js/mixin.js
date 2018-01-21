/**
 * Created by Administrator on 2018/1/15 0015.
 */
import  {mapGetters}  from "vuex"

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
