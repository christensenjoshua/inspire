<template>
    <div class="dashboard">
        <div class="row dashrow">
            <div class="col-12 text-right">
                <p><span class="shadow-lg">Here will be the weather stuff!</span></p>
            </div>
        </div>
        <div class="row dashrow">
            <div class="col-12 text-center">
                <h2><span class="shadow-lg">Good Morning {{user.displayName}}</span></h2>
            </div>
        </div>
        <div class="row dashrow">
            <div class="col-4">
                <p><span class="shadow-lg">An Image Name?</span></p>
            </div>
            <div class="col-4">
                <p><span class="shadow-lg">Some Quote!</span></p>
            </div>
            <div class="col-4">
                <p><span class="shadow-lg">Insert Todo List Here!</span></p>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'dashboard',
        data() {
            return {}
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {},
        components: {}
    }
</script>


<style scoped>
    .dashboard {
        height: 90%;
        width: 100%;
        /* background-color: rgba(255, 255, 255, 0.5) */
    }

    .dashrow {
        height: 33.33333333333%;
    }
</style>