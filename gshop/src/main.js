import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import './plugins/vant.js'

import './mock/mockServer'
import './filters'

Vue.use(Vant)

// 引入阿里图标库icon图标
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
