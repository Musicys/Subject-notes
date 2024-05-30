import './composition-api'
import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from 'uview-ui'
import constant from './constant'

Vue.use(uView)

uni.$u.setConfig({
	config: {
		unit: 'rpx'
	},
	props: {
		icon: {
			size: '16px'
		}
	}
})

uni.$u.globalVal = { ...constant }

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
