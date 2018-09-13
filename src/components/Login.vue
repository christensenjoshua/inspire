<template>
    <div class="login h-100 w-100 text-center">
        <form @submit.prevent="login(user); user= {}">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="user.email">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="user.password">
            <button class="btn btn-light" type="submit">Login</button>
        </form>
        <router-link :to="{name: 'Register'}">Register</router-link>
    </div>
</template>


<script>
    export default {
        name: 'login',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            login(user) {
                this.$store.dispatch('login', user)
            }
        },
        components: {}
    }
</script>


<style scoped>
    .login {
        padding-top: 30%;
    }
</style>