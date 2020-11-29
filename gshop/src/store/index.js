/* 
 * VueX最核心的管理对象store
 */

import Vue from 'vue'
import Vuex from 'vuex'

// 引入基本模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 挂载Vuex 声明
Vue.use(Vuex)
// 把 store 对象提供给 ’store‘选项，这可以把store的实例注入所有的子组件
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})