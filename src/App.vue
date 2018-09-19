<template>
  <div class="text-center" id="app">
    <div class="row navrow">
      <div class="col-12">
        <button class="btn" :class="'btn-'+themeColor" @click="toggleTheme" v-if="user.email">Theme</button>
        <button class="btn" :class="'btn-'+themeColor" @click="inspire" v-if="user.email">Inspire!</button>
        <button class="btn" :class="'btn-'+themeColor" @click="logout" v-if="user.email">Logout</button>
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
      },
      toggleTheme() {
        if (document.body.style.color == 'white') {
          document.body.style.color = 'black'
          this.$store.dispatch('toggleTheme', this.themeColor)
        } else {
          document.body.style.color = 'white'
          this.$store.dispatch('toggleTheme', this.themeColor)
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      themeColor() {
        return this.$store.state.theme
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
    color: black;
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