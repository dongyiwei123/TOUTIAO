import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/User',
    name: 'User',
    component: () => import('../views/user.vue')
  },
  {
    path: '/UserEdit',
    name: 'UserEdit',
    component: () => import('../views/userEdit.vue')
  },
  {
    path: '/myFollow',
    name: 'myFollow',
    component: () => import('../views/myFollow.vue')
  },
  {
    path: '/myComment',
    name: 'myComment',
    component: () => import('../views/myComment.vue')
  },
  {
    path: '/myStar',
    name: 'myStar',
    component: () => import('../views/myStar.vue')
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
