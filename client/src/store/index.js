import Vue from 'vue'
import Vuex from 'vuex'
import socket from '../config/socket'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPlayer: 0
  },
  mutations: {
    changePlayer (state, payload) {
      state.currentPlayer = payload
    }
  },
  actions: {
    changePlayer (context, payload) {
      context.commit('changePlayer', payload)
    },
    userJoin (context, payload) {
      socket.emit('user-join', payload)
      localStorage.setItem('playerName', payload)
      router.push({ name: 'Home' })
    }
  },
  modules: {
  }
})
