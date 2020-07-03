import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import { Field, Button, Form, Toast } from 'vant'
import 'amfe-flexible'

import './styles/css/base.css'
import './styles/less/common.less'
import './styles/less/iconfont.less'

import myLoge from './components/myLoge.vue'
import myHeader from './components/myHeader.vue'
Vue.config.productionTip = false

// axios优化
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 使用vant组件
Vue.use(Field)
Vue.use(Button)
Vue.use(Form)
Vue.use(Toast)

Vue.component('myHeader', myHeader)
Vue.component('myLoge', myLoge)

new Vue({
  router,
  render: h => h(App)
  // component: {
  //   myHeader
  // }
}).$mount('#app')
