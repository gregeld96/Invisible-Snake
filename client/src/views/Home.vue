<template>
  <div class="home">
    <h1>{{message}}</h1>
    <p>Player: {{playerName}}</p>
    {{players}}
    <p>INI CURRENT PLAYER >>>>>>>>>> {{players[currentPlayer]}}</p>
    <p>{{currentPlayer}} >>>>>>>>>>>>>>>>>>> ini harusnya INDEX</p>
    <button @click="addStep" v-if="players[currentPlayer].playerName === playerName && !message">Dice</button>
  </div>
</template>

<script>
// @ is an alias to /src
import socket from '../config/socket'

export default {
  name: 'Home',
  data () {
    return {
      playerName: localStorage.playerName,
      players: [],
      currentPlayer: 0,
      message: ''
    }
  },
  methods: {
    addStep () {
      socket.emit('add-step', this.currentPlayer)
      if (this.currentPlayer === this.players.length - 1) this.currentPlayer = 0
      else this.currentPlayer++
      socket.emit('changePlayer', this.currentPlayer)
    }
  },
  created () {
    socket.on('player-data', (data) => {
      this.players = data
    })

    socket.on('changePlayer', (index) => {
      this.currentPlayer = index
    })

    socket.on('player-win', (data) => {
      this.message = `WINNER IS ${data.playerName}`
    })
  },
  computed: {
  }
}
</script>
