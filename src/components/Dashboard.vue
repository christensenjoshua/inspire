<template>
    <div class="dashboard">
        <div class="row dashrow-top justify-content-between">
            <div class="col-10">

            </div>
            <div v-if="weather.kelvin" class="col-2 over-item shadow-lg rounded text-right">
                <h3>{{weather.fahrenheit}}</h3>
                <p>{{weather.name}}</p>
                <img :src="'http://openweathermap.org/img/w/'+weather.weather[0].icon+'.png'">
            </div>
        </div>
        <div class="row dashrow-mid justify-content-between">
            <div class="col4"></div>
            <div class="col-4 text-center over-item shadow-lg rounded">
                <h2>Good Morning {{user.displayName}}</h2>
                <h3>{{theTime.hour}}:{{theTime.minute}}:{{theTime.second}}</h3>
            </div>
            <div class="col4"></div>
        </div>
        <div class="row dashrow-bottom justify-content-between">
            <div class="col-4 over-item shadow-lg rounded bottom-row">
                <p>An Image Name?</p>
            </div>
            <div class="col-4 over-item shadow-lg rounded bottom-row">
                <p v-if="quote">{{quote.quote}}</p>
            </div>
            <div class="col-4 over-item shadow-lg rounded bottom-row" style="overflow-y:scroll;">
                <h3>To Do:</h3>
                <table class="table text-right table-bordered table-striped">
                    <tr v-for="item in todo">
                        <td>
                            <div class="row text-left">
                                <div class="col-12">
                                    <input type="checkbox" :name="item.id" :id="item.id" @click="toggleTodo(item)"
                                        :checked="item.completed">
                                    <label :for="item.id">{{item.description}}</label>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <form @submit.prevent="createTodo(newTodo); newTodo = ''">
                    <input type="text" placeholder="today I will..." v-model="newTodo">
                    <button class="btn btn-dark" type="submit">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                newTodo: '',
                timeBlob: {}
            }
        },
        mounted() {
            this.doTime()
            let forever = setInterval(this.doTime(), 500)
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            quote() {
                return this.$store.state.currQuote
            },
            todo() {
                return this.$store.state.todo
            },
            weather() {
                return this.$store.state.weather
            },
            theTime() {
                return this.$store.state.theTime
            }
        },
        methods: {
            createTodo(newTodo) {
                this.$store.dispatch('createTodo', newTodo)
            },
            toggleTodo(item) {
                let val = document.getElementById(item.id).checked
                document.getElementById(item.id).checked = val
                console.log(val)
                item.completed = val
                this.$store.dispatch('toggleTodo', item)
            },
            doTime() {
                let today = new Date();
                let h = today.getHours()
                let m = today.getMinutes()
                let s = today.getSeconds()
                if (h < 10) { h = '0' + h }
                if (m < 10) { m = '0' + m }
                if (s < 10) { s = '0' + s }
                this.timeBlob = {}
                this.timeBlob.hour = h
                this.timeBlob.minute = m
                this.timeBlob.second = s
                this.$store.dispatch('setTime', this.timeBlob)
            }
        },
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
        height: fit-content;
        max-height: 100%;
    }

    .bottom-row {
        height: 100%;
        width: 33.33333%;
    }

    input[type=checkbox]+label {
        text-decoration: none;
    }

    input[type=checkbox]:checked+label {
        text-decoration: line-through;
    }
</style>