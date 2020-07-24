<template>
<div class="row">
  <div>
  <table>
  <tr>
    <th>No.</th>
    <th>Player Name</th>
    <th>Icon</th>
    <th>Player Turn</th>
  </tr>
  <tr v-for="player in players" :key="player.playerIndex">
    <td>{{ player.playerIndex+1}}</td>
    <td>{{ player.playerName}}</td>
    <td><img :src="`https://avatars.dicebear.com/api/human/${player.playerName}.svg`" /></td>
    <td v-if="player.playerIndex === 0" :rowspan="players.length">{{ players[currentPlayer].playerName }}</td>
  </tr>
</table>
</div>
<div class="home" style="background-color: whitesmoke;">
<!-- {{ players }} -->
<h1>{{message}}</h1>
<div class="board">
<block :data="block" class="block" v-for="(block, index) in board" :key="index" :players='players'></block>
</div>
<button class="roll" @click="addStep" v-if="players[currentPlayer].playerName === playerName && !message" >ROLL DICE</button>
<button class='button' @click="restart" v-else-if="message">Restart</button>
</div>
</div>
</template>
<script>
import socket from '../config/socket'
import block from '../components/block'
import Swal from 'sweetalert2'
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
    },
    restart () {
      socket.emit('restart')
    }
  },
  created: function () {
    // socket.emit('restart')
    this.board = null
    this.fetchBoard()
    this.board = this.$store.state.board
    socket.on('player-data', (data) => {
      this.players = data
    })

    socket.on('changePlayer', (index) => {
      this.currentPlayer = index
    })

    socket.on('player-win', (data) => {
      this.message = `Winner Is ${data.playerName}`
      Swal.fire({
        title: `${data.playerName} is The Winner`,
        width: 600,
        padding: '3em',
        background: '#fff url("https://acegif.com/wp-content/uploads/2020/05/confetti.gif")',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://33.media.tumblr.com/e81cbd3ba2b119177e98d05878b7e96c/tumblr_nji005weBd1qiq6rto1_250.gif")
          right top
          no-repeat
        `
      })
    })

    socket.on('restart-game', (data) => {
      this.players = data
      localStorage.clear()
      this.$router.push('/')
    })

    socket.on('ladder', (data) => {
      Swal.fire({
        title: `${this.players[data].playerName} Got a Ladder`,
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://thumbs.gfycat.com/ScaryMassiveGallowaycow-small.gif")
          left top
          no-repeat
        `
      })
    })

    socket.on('snake', (data) => {
      Swal.fire({
        title: `${this.players[data].playerName} Got a Snake`,
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://thumbs.gfycat.com/HeavenlyWanHornedviper-max-1mb.gif")
          left top
          no-repeat
        `
      })
    })
  }
}
</script>

<style>
.home{
    height: 600px;
    width: 600px;
    border: 2px solid;
    /* margin: auto; */
}

.row {
  display: flex;
  justify-content: center;
}

table {
  width: 500px;
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
    overflow: hidden;
}

.block{
    width: 10%;
    height: 10%;
    font-size: 14px;
}

.button{
  margin-top: 20px;
  width: 100px;
  height: 50px;
  background-color: teal;
  color: white;
}
</style>
