import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: null,
    row: [],
    col: [],
    num: 1
  },
  mutations: {
    board (state, payload) {
      console.log(payload)
      state.board = payload
    }
  },
  actions: {
    generateBoard (context, payload) {
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
      } console.log(this.state.row)
      context.commit('board', [].concat.apply([], this.state.row))
    }
  },
  getters: {
  }
})
