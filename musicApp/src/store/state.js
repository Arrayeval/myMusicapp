/**
 * Created by Administrator on 2017/12/4 0004.
 */
import playMde from "common/js/config"

const state={
  singer:{},

  playing:false,//是否播放
  fullScreen:false,//是否全屏
  playList:[],//播放列表
  sequenceList:[],//顺序播放表
  mode:playMde.sequence,
  currentIndex:-1//当前播放
};

export  default  state
