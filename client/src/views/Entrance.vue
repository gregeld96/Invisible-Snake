<template>
  <div>
    <div class="form__group field">
      <form @submit.prevent="join()">
        <label for="name" class="form__label">Snake and Bold</label>
        <input
          type="input"
          class="form__field"
          placeholder="Nick Name"
          name="name"
          id="name"
          required
          v-model="nickname"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entrance',
  data () {
    return {
      nickname: ''
    }
  },
  methods: {
    join () {
      this.$store.dispatch('userJoin', this.nickname)
      this.nickname = ''
    }
  },
  created () {
  }
}
</script>

<style>
.form__group {
  position: relative;
  padding: 50px;
  margin: 150px auto;
  width: 35%;
  background-color: #4ea0ae;
  border-radius: 20px;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: rgb(63, 63, 63);
  padding: 7px 0;
  background: transparent;
}
.form__field::placeholder {
  color: rgb(218, 218, 218);
}

.form__label {
  position: absolute;
  top: 20px;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #fff48f;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #df8b0e, yellow);
  border-image-slice: 1;
}
</style>
