/**
 * Created by Administrator on 2017/12/4 0004.
 */
import Vue from "vue"
import Vuex from "vuex"
import * as actions from "./actions"
import * as getters from './getters'
import state from "./state"
import mutations from './mutations'

//vuex的插件，用于检测state
import createLogger from "vuex/dist/logger"

Vue.use(Vuex);


//在开发环境中（dev）我们要检测对于state的修改是否通过mutation
const debug = process.env.NODE_ENV !=="production"



export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict:debug,//严格模式(检测state的状态修改是否是基于mutation)
  plugins:debug? [createLogger()]:[]
})
