import Vue from 'vue'
import VueRouter from 'vue-router'
import Entrance from '../views/Entrance.vue'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/snake-and-ladder',
    name: 'snake-and-ladder',
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
