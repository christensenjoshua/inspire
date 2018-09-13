<template>
  <div class="text-center" id="app">
    <div class="row navrow">
      <div class="col-12">
        <button class="btn btn-light" @click="logout" v-if="user.email">Logout</button>
      </div>
    </div>
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

  .row {
    margin: 0%;
  }

  .navrow {
    height: 10%;
    /* background-color: rgba(255, 255, 255, 0.5) */
  }
</style>