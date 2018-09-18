<template>
    <div class="login h-100 w-100 text-center">
        <form class="login-form" @submit.prevent="login(user); user= {}">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="user.email">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="user.password">
            <button class="btn btn-dark" type="submit">Login</button>
            <hr />
            <router-link class="btn btn-sm btn-dark" :to="{name: 'Register'}">Register</router-link>
        </form>
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
        mounted() {
            this.$store.dispatch('getImage')
        },
        components: {}
    }
</script>


<style scoped>
    .login {
        padding-top: 30%;
    }

    .login-form {
        background-color: rgba(255, 255, 255, 0.9);
    }
</style>