<template>
<div class="home" style="background-color: whitesmoke;">
<div class="board">
<block :data="block" class="block" v-for="(block, index) in board" :key="index"></block>
</div>
<button class="roll">ROLL DICE</button>
</div>
</template>

<script>
import block from '../components/block'
export default {
  name: 'home',
  components: {
    block
  },
  data () {
    return {
      dimension: 10,
      board: null
    }
  },
  methods: {
    fetchBoard () {
      this.$store.dispatch('generateBoard', this.dimension)
    }
  },
  created: function () {
    this.fetchBoard()
    this.board = this.$store.state.board
    this.$store.state.board = null
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
