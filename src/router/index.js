import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 防止点击登录按钮报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "user" */ '../views/login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/register.vue')
  },
  {
    path: '/User',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/user.vue')
  },
  {
    path: '/UserEdit',
    name: 'UserEdit',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/userEdit.vue')
  },
  {
    path: '/myFollow',
    name: 'myFollow',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/myFollow.vue')
  },
  {
    path: '/myComment',
    name: 'myComment',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/myComment.vue')
  },
  {
    path: '/myStar',
    name: 'myStar',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/myStar.vue')
  },
  {
    path: '/postDetail/:id',
    name: 'postDetail',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/PostDetail.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Search.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Category.vue')
  }
]

const router = new VueRouter({
  routes
})
const pages = ['/user', '/userEdit', '/myFollow', '/myComment', '/myStar']
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  // console.log(token)
  if (pages.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/Login')
    }
  }
  next()
})
export default router
