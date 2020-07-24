import Vue from 'vue'
import Vuex from 'vuex'
import socket from '../config/socket'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: null,
    row: [],
    col: [],
    num: 1,
    currentPlayer: 0
  },
  mutations: {
    board (state, payload) {
      console.log(payload)
      state.board = payload
    },
    changePlayer (state, payload) {
      state.currentPlayer = payload
    }
  },
  actions: {
    generateBoard (context, payload) {
      if (this.state.board !== null) {
        return null
      } else {
        for (let i = 0; i < payload; i++) {
          for (let j = 0; j < payload; j++) {
            if (i % 2 === 0) {
              this.state.col.push(this.state.num)
              this.state.num++
            } else {
              this.state.col.unshift(this.state.num)
              this.state.num++
            }
          }
          this.state.row.unshift(this.state.col)
          this.state.col = []
        }
      }
      console.log(this.state.row)
      context.commit('board', [].concat.apply([], this.state.row))
    },
    changePlayer (context, payload) {
      context.commit('changePlayer', payload)
    },
    userJoin (context, payload) {
      socket.emit('user-join', payload)
      localStorage.setItem('playerName', payload)
      router.push({ name: 'snake-and-ladder' })
    }
  },
  getters: {
  }
})
