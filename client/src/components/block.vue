<template>
<div class="block-component">
    <div v-for="player in players" :key="player.playerIndex">
      <img v-if="player.position === data" :src="`https://avatars.dicebear.com/api/human/${player.playerName}.svg`" />
    </div>
    <p>{{ data }}</p>
</div>
</template>

<script>
export default {
  name: 'block',
  props: ['data', 'players'],
  data () {
    return {

    }
  },
  computed: {
  }
}
</script>

<style>
.block-component{
  overflow-y: auto;
}

img {
  width: 30px;
  height: 30px;
}
</style>
