<template>
<div class="home" style="background-color: whitesmoke;">
<h1>{{message}}</h1>
<div class="board">
<block :data="block" class="block" v-for="(block, index) in board" :key="index"></block>
</div>
<button class="roll" @click="addStep" v-if="players[currentPlayer].playerName === playerName && !message">ROLL DICE</button>
</div>
</template>

<script>
import socket from '../config/socket'
import block from '../components/block'
export default {
  name: 'home',
  components: {
    block
  },
  data () {
    return {
      dimension: 10,
      board: null,
      playerName: localStorage.playerName,
      players: [],
      currentPlayer: 0,
      message: ''
    }
  },
  methods: {
    fetchBoard () {
      this.$store.dispatch('generateBoard', this.dimension)
    },
    addStep () {
      socket.emit('add-step', this.currentPlayer)
      if (this.currentPlayer === this.players.length - 1) this.currentPlayer = 0
      else this.currentPlayer++
      socket.emit('changePlayer', this.currentPlayer)
    }
  },
  created: function () {
    this.fetchBoard()
    this.board = this.$store.state.board
    this.$store.state.board = null

    socket.on('player-data', (data) => {
      this.players = data
    })

    socket.on('changePlayer', (index) => {
      this.currentPlayer = index
    })

    socket.on('player-win', (data) => {
      this.message = `WINNER IS ${data.playerName}`
    })
  }
}
</script>

<style>
.home{
    height: 600px;
    width: 600px;
    border: 2px solid;
    margin-left: 310px;
    margin-top: 30px;
}

.roll{
    width: 400px;
    height: 40px;
    font-size: 18px;
    border: 3px solid black;
    background-color: gold;
    color: BLACK;
    font-weight: bold;
}

.roll:hover{
    border: 3px solid black;
    background-color: black;
    color: gold;
    font-weight: bold;
    cursor: pointer;
}

.board{
    height: 500px;
    width: 500px;
    border: 2px dashed black;
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.block{
    width: 10%;
    height: 10%;
    font-size: 14px;
}
</style>
