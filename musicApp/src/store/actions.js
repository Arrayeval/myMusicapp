/**
 * Created by Administrator on 2017/12/4 0004.
 */
//我们在一次操作的时候可能会改变很多状态，出发很多mutation,这个时候我们需要封装一个action
import * as types from './mutation-types'

import playMode from 'common/js/config'

import {shuffle} from "common/js/util"

function findIndex(list,song){
  return list.findIndex((item)=>{
    return item.id===song.id
  })
}


export const  selectPlay =function({commit,state},{list,index}){
  //改变顺序播放列表
  commit(types.SET_SEQUENCE_LIST,list);

  if(state.mode ===playMode.random){
    let randomList =shuffle(list);
    commit(types.SET_PLAYLIST,randomList);
    //查找顺序列表中的这首歌对应到歌曲列表中是那首歌曲
    index = findIndex(randomList,list[index])
  }
  else{
    //改变播放列表
    commit(types.SET_PLAYLIST,list);
  }



  //播放索引
  commit(types.SET_FULL_SCREEN,true);

  //播放状态
  commit(types.SET_PLAYING_STATE,true);

  commit(types.SET_CURRENT_INDEX,index);
};



export const randomPlay=function({commit},{list}){
  commit(types.SET_PLAY_MODE,playMode.random);
  commit(types.SET_SEQUENCE_LIST,list);
  let randomList = shuffle(list);
  commit(types.SET_PLAYLIST,randomList);

  commit(types.SET_CURRENT_INDEX,0);
  //播放索引
  commit(types.SET_FULL_SCREEN,true);

  //播放状态
  commit(types.SET_PLAYING_STATE,true);

};
