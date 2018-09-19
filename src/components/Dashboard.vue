<template>
    <div class="dashboard">
        <div class="row dashrow-top justify-content-between">
            <div class="col-8 col-md-10">

            </div>
            <div v-if="weather.kelvin" class="col-4 col-md-2 over-item shadow-lg rounded text-right">
                <a href="javascript:;" @click="toggleWeather()" style="text-decoration-line: underline; color:black;">
                    <h4>
                        <span v-if="weatherPref=='Fahrenheit'">{{weather.fahrenheit}} &deg;f</span>
                        <span v-if="weatherPref=='Celsius'">{{weather.celsius}} &deg;c</span>
                        <span v-if="weatherPref=='Kelvin'">{{weather.kelvin}} k</span>
                    </h4>
                </a>
                <p>{{weather.name}}</p>
                <img :src="'https://openweathermap.org/img/w/'+weather.weather[0].icon+'.png'" width="75px">
            </div>
        </div>
        <div class="row dashrow-mid justify-content-between">
            <div class="col-2 col-md-4"></div>
            <div class="col-6 col-md-4 text-center over-item shadow-lg rounded">
                <clock-comp></clock-comp>
            </div>
            <div class="col-2 col-md-4"></div>
        </div>
        <div class="row dashrow-bottom justify-content-between">
            <div class="col-12 col-md-4 over-item shadow-lg rounded bottom-row">
                <p v-if="quote" :title="'- '+quote.author">{{quote.quote}}</p>
            </div>
            <div class="col-12 col-md-4 shadow-lg rounded bottom-row">
                <p v-if="currImage.id">
                    <a class="btn btn-dark" :href="'https://unsplash.com/@'+currImage.user.username+'?utm_source=inspire-portfolio-project&utm_medium=referral'"
                        target="new" style="white-space:normal;">
                        Image By: {{currImage.user.name}} on UnSplash
                    </a>
                </p>
            </div>
            <div class="col-12 col-md-4 over-item shadow-lg rounded bottom-row-todo">
                <h4>To Do: {{todoNum}}</h4>
                <table class="table text-right table-bordered table-striped">
                    <tr v-for="item in todo">
                        <td class="text-left">
                            <button @click="removeTodo(item.id)" class="btn btn-sm btn-danger">X</button>
                            <input type="checkbox" :name="item.id" :id="item.id" @click="toggleTodo(item)" :checked="item.completed">
                            <label :for="item.id">{{item.description}}</label>
                        </td>
                    </tr>
                </table>
                <form @submit.prevent="createTodo(newTodo); newTodo = ''">
                    <input class="form-control" type="text" placeholder="today I will..." v-model="newTodo" required>
                    <button class="btn btn-sm btn-dark" type="submit">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import ClockComp from '@/components/Clock'
    export default {
        name: 'dashboard',
        data() {
            return {
                newTodo: '',
                weatherPref: 'Fahrenheit'
            }
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
            currImage() {
                return this.$store.state.currImage
            },
            todoNum() {
                return this.$store.state.todoNum
            }
        },
        methods: {
            createTodo(newTodo) {
                this.$store.dispatch('createTodo', newTodo)
            },
            toggleTodo(item) {
                let val = document.getElementById(item.id).checked
                document.getElementById(item.id).checked = val
                item.completed = val
                this.$store.dispatch('toggleTodo', item)
            },
            removeTodo(id) {
                this.$store.dispatch('removeTodo', id)
            },
            toggleWeather() {
                if (this.weatherPref == 'Fahrenheit') {
                    this.weatherPref = 'Celsius'
                } else if (this.weatherPref == 'Celsius') {
                    this.weatherPref = 'Kelvin'
                } else {
                    this.weatherPref = 'Fahrenheit'
                }
            }
        },
        components: {
            'clock-comp': ClockComp
        }
    }
</script>


<style scoped>
    .dashboard {
        height: 90%;
        width: 100%;
    }

    .dashrow-top {
        height: 25%;
    }

    .dashrow-mid {
        height: 50%;
    }

    .dashrow-bottom {
        height: 25%;
        align-items: flex-end;
    }

    .over-item {
        background-color: rgba(255, 255, 255, 0.9);
        height: fit-content;
        max-height: 100%;
    }

    .bottom-row {
        width: 33.33333%;
        overflow: auto;
    }

    .bottom-row-todo {
        width: 33.33333%;
        overflow: auto;
        height: 100%;
    }

    input[type=checkbox]+label {
        text-decoration: none;
    }

    input[type=checkbox]:checked+label {
        text-decoration: line-through;
    }
</style>