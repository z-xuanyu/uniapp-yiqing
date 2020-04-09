import Vue from 'vue'
import App from './App'

// 全局注册顶部导航组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

// 全局注册底部tabbar组件
import map from './components/map.vue'
Vue.component("v-map",map)

import real from './components/real.vue'
Vue.component("real",real)

import rumor from './components/rumor.vue'
Vue.component("rumor",rumor)

import virus from './components/virus.vue'
Vue.component("virus",virus)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
