import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// const Welcome = () => import('@/pages/welcome/Welcome')
const Login = () => import('@/pages/login/Login')
const Home = () => import('@/pages/home/Home')

Vue.use(Router)

const YzRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    }
  ]
})

YzRouter.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.meta.auth) {
    if (token) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default YzRouter
