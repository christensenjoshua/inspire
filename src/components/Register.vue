<template>
    <div class="register h-100 w-100 text-center">
        <form class="register-form" @submit.prevent="register(user); user= {}">
            <label for="displayName">Display Name</label>
            <input class="form-control" type="text" id="displayName" name="displayName" v-model="user.displayName"
                required>
            <label for="email">Email</label>
            <input class="form-control" type="email" id="email" name="email" v-model="user.email" required>
            <label for="password">Password</label>
            <input class="form-control" type="password" id="password" name="password" v-model="user.password" required>
            <button class="btn btn-dark" type="submit">Register</button>
            <hr />
            <router-link class="btn btn-sm btn-dark" :to="{name: 'Login'}">Login</router-link>
        </form>
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
        mounted() {
            this.$store.dispatch('getImage')
        },
        components: {}
    }
</script>


<style scoped>
    .register {
        padding-top: 30%;
    }

    .register-form {
        background-color: rgba(255, 255, 255, 0.9);

    }
</style>