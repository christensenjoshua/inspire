<template>
    <div class="dashboard">
        <div class="row dashrow-top justify-content-between">
            <div class="col-8">

            </div>
            <div class="col-4 over-item shadow-lg rounded text-right">
                <p>Here will be the weather stuff!</p>
            </div>
        </div>
        <div class="row dashrow-mid justify-content-between">
            <div class="col4"></div>
            <div class="col-4 text-center over-item shadow-lg rounded">
                <h2>Good Morning {{user.displayName}}</h2>
            </div>
            <div class="col4"></div>
        </div>
        <div class="row dashrow-bottom justify-content-between">
            <div class="col-4 over-item shadow-lg rounded">
                <p>An Image Name?</p>
            </div>
            <div class="col-4 over-item shadow-lg rounded">
                <p v-if="quote">{{quote.quote}}</p>
            </div>
            <div class="col-4 over-item shadow-lg rounded">
                <p>Insert Todo List Here!</p>
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
            },
            quote() {
                return this.$store.state.currQuote
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

    .dashrow-top {
        height: 25%;
    }

    .dashrow-mid {
        height: 50%;
    }

    .dashrow-bottom {
        height: 25%;
    }

    .over-item {
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>