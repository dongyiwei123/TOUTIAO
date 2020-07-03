import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
