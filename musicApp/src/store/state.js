/**
 * Created by Administrator on 2017/12/4 0004.
 */
import playMode from "common/js/config"
import {loadSearch} from "common/js/cache"

const state={
  singer:{},

  playing:false,//是否播放
  fullScreen:false,//是否全屏
  playList:[],//播放列表
  sequenceList:[],//顺序播放表
  mode:playMode.sequence,
  currentIndex:-1,//当前播放

  disc:{},//歌单对象
  topList:{},
  searchHistory:loadSearch()
};

export  default  state
