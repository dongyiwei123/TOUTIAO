import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import moment from 'moment'
import './vants/vants'
import 'amfe-flexible'

import './styles/css/base.css'
import './styles/less/common.less'
import './styles/less/iconfont.less'

import myLoge from './components/myLoge.vue'
import myHeader from './components/myHeader.vue'
import navBar from './components/navBar.vue'
Vue.config.productionTip = false
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
// axios优化
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  // console.log(res)
  if ((statusCode === 401) & (message === '用户信息验证失败')) {
    this.$toast.fail(message)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
    router.push('/Login')
  }
  return res
})

Vue.component('myHeader', myHeader)
Vue.component('myLoge', myLoge)
Vue.component('navBar', navBar)

new Vue({
  router,
  render: h => h(App)
  // component: {
  //   myHeader
  // }
}).$mount('#app')
