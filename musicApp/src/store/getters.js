/**
 * Created by Administrator on 2017/12/4 0004.
 */
export const singer = state => state.singer;

/*
 * 播放器相关信息
 * */
export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
};

export const disc = state => state.disc;

export const topList = state => state.topList;

export const searchHistory = state => state.searchHistory;

export const playHistory = state => state.playHistory;
