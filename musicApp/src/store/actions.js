/**
 * Created by Administrator on 2017/12/4 0004.
 */
//我们在一次操作的时候可能会改变很多状态，出发很多mutation,这个时候我们需要封装一个action
import * as types from './mutation-types'

import playMode from 'common/js/config'

import {shuffle} from "common/js/util"

import {saveSearch, deleteSearch, clearSearch} from "common/js/cache"

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}


export const selectPlay = function ({commit, state}, {list, index}) {
  //改变顺序播放列表
  commit(types.SET_SEQUENCE_LIST, list);

  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    //查找顺序列表中的这首歌对应到歌曲列表中是那首歌曲
    index = findIndex(randomList, list[index])
  }
  else {
    //改变播放列表
    commit(types.SET_PLAYLIST, list);
  }


  //播放索引
  commit(types.SET_FULL_SCREEN, true);

  //播放状态
  commit(types.SET_PLAYING_STATE, true);

  commit(types.SET_CURRENT_INDEX, index);
};

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQUENCE_LIST, list);
  let randomList = shuffle(list);
  commit(types.SET_PLAYLIST, randomList);

  commit(types.SET_CURRENT_INDEX, 0);
  //播放索引
  commit(types.SET_FULL_SCREEN, true);

  //播放状态
  commit(types.SET_PLAYING_STATE, true);

};

export const insertSong = function ({commit, state}, song) {
  let playlist = state.sequenceList.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  //记录当前歌曲
  let currentSong = playlist[currentIndex];
  //查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song);
  //插入歌曲，索引加1
  currentIndex++;
  //插入这首歌曲到当前索引位置
  playlist.splice(currentIndex, 0, song);
  //如果已经包含了这首歌曲，就需要删除
  if (fpIndex > -1) {
    //如果当前插入的序号大于列表的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1);
    }
    else {
      playlist.splice(fpIndex + 1, 1);
    }
  }
  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};

export const deleteSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
};

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch());
};
