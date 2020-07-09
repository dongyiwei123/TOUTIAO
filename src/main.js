import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
// import './vants/vants.js'
import moment from 'moment'
import 'amfe-flexible'

import './styles/css/base.css'
import './styles/less/common.less'
import './styles/less/iconfont.less'

import myLoge from './components/myLoge.vue'
import myHeader from './components/myHeader.vue'
import navBar from './components/navBar.vue'
import myNew from './components/myNew.vue'
import {
  Field,
  Button,
  Form,
  Toast,
  Dialog,
  CellGroup,
  Cell,
  Radio,
  RadioGroup,
  Uploader,
  Icon,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'

// 使用vant组件
Vue.use(Field)
Vue.use(Button)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.config.productionTip = false
Vue.filter('time', (input, style = 'YYYY-MM-DD') => {
  return moment(input).format(style)
})
// axios优化
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 图片链接
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
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
    Toast.fail(message)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
    router.push('/Login')
  }
  return res
})

Vue.component('myHeader', myHeader)
Vue.component('myLoge', myLoge)
Vue.component('navBar', navBar)
Vue.component('myNew', myNew)

new Vue({
  router,
  render: h => h(App)
  // component: {
  //   myHeader
  // }
}).$mount('#app')
