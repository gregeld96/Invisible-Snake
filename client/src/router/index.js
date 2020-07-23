import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Entrance from '../views/Entrance.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Entrance',
    component: Entrance
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.playerName) next({ name: 'Home' })
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Entrance' && !localStorage.playerName) next({ name: 'Entrance' })
//   else next()
// })

export default router
