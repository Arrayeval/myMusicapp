/**
 * Created by Administrator on 2017/12/4 0004.
 */
//我们在一次操作的时候可能会改变很多状态，出发很多mutation,这个时候我们需要封装一个action
import * as types from './mutation-types'

export const  selectPlay =function({commit,state},{list,index}){
  //改变顺序播放列表
  commit(types.SET_SEQUENCE_LIST,list);

  //改变播放列表
  commit(types.SET_PLAYLIST,list);

  //播放索引
  commit(types.SET_FULL_SCREEN,true);

  //播放状态
  commit(types.SET_PLAYING_STATE,true);

};
