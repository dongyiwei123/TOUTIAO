import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/login.vue')
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
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  // console.log(token)
  if (to.path === ('/user' || 'userEdit')) {
    if (token) {
      next()
    } else {
      router.push('/Login')
    }
  }
  next()
})
export default router
