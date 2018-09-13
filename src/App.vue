<template>
  <div class="text-center" id="app">
    <button class="btn btn-light" @click="logout" v-if="user.email">Logout</button>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>

<style>
  body,
  html {
    height: 100%;
  }

  #app {
    background-image: url("https://via.placeholder.com/350x350");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>