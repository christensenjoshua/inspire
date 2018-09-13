<template>
    <div class="register h-100 w-100 text-center">
        <form @submit.prevent="register(user); user= {}">
            <label for="displayName">Display Name</label>
            <input type="text" id="displayName" name="displayName" v-model="user.displayName">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="user.email">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="user.password">
            <button class="btn btn-light" type="submit">Register</button>
        </form>
        <router-link :to="{name: 'Login'}">Login</router-link>
    </div>
</template>


<script>
    export default {
        name: 'register',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            register(user) {
                this.$store.dispatch('register', user)
            }
        },
        components: {}
    }
</script>


<style scoped>
    .register {
        padding-top: 30%;
    }
</style>