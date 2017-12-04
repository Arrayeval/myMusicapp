/**
 * Created by Administrator on 2017/12/4 0004.
 */
import * as types from './mutation-types'

const mutations={
  [types.SET_SINGER](state,singer){
    state.singer = singer
  }
}

export default  mutations
