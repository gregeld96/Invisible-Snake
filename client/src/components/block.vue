<template>
<div class="block-component">
    <p v-if="playerPosition">{{ playerPosition }}</p>
    <p v-else>{{ data }}</p>
</div>
</template>

<script>
export default {
  name: 'block',
  props: ['data'],
  data () {
    return {

    }
  },
  computed: {
  }
}
</script>

<style>
</style>
