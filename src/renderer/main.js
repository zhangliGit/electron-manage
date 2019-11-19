import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/css/base.css'
import './assets/css/antd-reset.css'
import Tools from './utils/tools'
Vue.use(Antd)
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$tools = Tools
Vue.config.productionTip = false
const bus = new Vue()
bus.$message.config({
  top: `5px`,
  maxCount: 1,
})
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data: {
    bus
  }
}).$mount('#app')
