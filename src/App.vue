<template>
  <div class="text-center" id="app">
    <div class="row navrow">
      <div class="col-12">
        <button class="btn btn-light" @click="inspire" v-if="user.email">Inspire!</button>
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
      },
      inspire() {
        this.$store.dispatch('inspire')
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    components: {
    }
  }
</script>

<style>
  body,
  html {
    height: 100%;
  }

  body {
    background-image: url("");

  }

  #app {
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
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