import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../utils/firebaseInit'
import axios from 'axios'
import authString from '../utils/unsplash'

let api = axios.create({
    baseURL: 'https://bcw-sandbox.herokuapp.com/api/',
    timeout: 10000
})
let imageApi = axios.create({
    baseURL: 'https://api.unsplash.com/',
    timeout: 3000,
    headers: {
        Authorization: authString
    }
})
vue.use(vuex)

let store = new vuex.Store({
    state: {
        user: {},
        currImage: {},
        currQuote: {},
        weather: {},
        todo: [],
        todoNum: 0
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setImage(state, payload) {
            state.currImage = payload
        },
        setQuote(state, payload) {
            state.currQuote = payload
        },
        setWeather(state, payload) {
            state.weather = payload
        },
        setTodo(state, payload) {
            state.todo = payload
        },
        setTodoNum(state, payload) {
            state.todoNum = payload
        }
    },
    actions: {
        login({ commit, dispatch }, user) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(res => {
                commit('setUser', res.user)
                router.push('/dashboard')
            }).catch(err => {
                console.error(err)
            })
        },
        register({ commit, dispatch }, user) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => {
                console.log(res.user)
                commit('setUser', res.user)
                router.push('/dashboard')
                firebase.auth().currentUser.updateProfile({ displayName: user.displayName }).then(res => {
                    //Update the user's display name.
                }).catch(err => {
                    console.error(err)
                })
            }).catch(err => {
                console.error(err)
            })
        },
        logout({ commit, dispatch }) {
            firebase.auth().signOut().then(res => {
                router.push('/')
                commit('setUser', {})
            }).catch(err => {
                console.error(err)
            })
        },
        authenticate({ commit, dispatch }) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    dispatch('getImage')
                    dispatch('getQuote')
                    dispatch('getWeather')
                    commit('setUser', user)
                    dispatch('getTodo')
                    router.push('/dashboard')
                } else {
                    router.push('/')
                }
            })
        },
        getImage({ commit, dispatch }) {
            imageApi.get('/photos/random/?w=1920&h=1080').then(res => {
                commit('setImage', res.data)
                document.getElementById('app').style.backgroundImage = "url('" + res.data.urls.custom + "'"
            }).catch(err => {
                console.error(err)
            })
        },
        getQuote({ commit, dispatch }) {
            api.get('quotes').then(res => {
                commit('setQuote', res.data)
            }).catch(err => {
                console.error(err)
            })
        },
        getWeather({ commit, dispatch }) {
            api.get('weather').then(res => {
                let weather = res.data
                weather.kelvin = weather.main.temp
                weather.celsius = (weather.kelvin - 273.15).toFixed(2)
                weather.fahrenheit = ((weather.kelvin * (9 / 5)) - 459.67).toFixed(2)
                commit('setWeather', weather)
            }).catch(err => {
                console.error(err)
            })
        },
        getTodo({ state, commit, dispatch }) {
            db.collection('todo').where('creatorId', '==', state.user.uid).get().then(querySnapshot => {
                let todoList = []
                let unfinished = 0
                querySnapshot.forEach(doc => {
                    let item = doc.data()
                    if (!item.completed) {
                        unfinished++
                    }
                    item.id = doc.id
                    todoList.push(item)
                })
                todoList.sort(function (a, b) {
                    let aComp = 0
                    let bComp = 0
                    if (a.completed) {
                        aComp++
                    }
                    if (b.completed) {
                        bComp++
                    }
                    if (aComp == bComp) {
                        return (a.timeCreated < b.timeCreated) ? 1 : (a.timeCreated > b.timeCreated) ? -1 : 0
                    } else {
                        return (aComp < bComp) ? -1 : 1
                    }
                })
                commit('setTodo', todoList)
                commit('setTodoNum', unfinished)
            }).catch(err => {
                console.error(err)
            })
        },
        createTodo({ state, commit, dispatch }, newTodo) {
            let item = {}
            item.creatorId = state.user.uid
            item.description = newTodo
            item.completed = false
            item.timeCreated = new Date().getTime()
            db.collection('todo').add(item).then(doc => {
                dispatch('getTodo')
            }).catch(err => {
                console.error(err)
            })
        },
        toggleTodo({ commit, dispatch }, item) {
            db.collection('todo').doc(item.id).set(item).then(() => {
                dispatch('getTodo')
            })
        },
        inspire({ commit, dispatch }) {
            dispatch('getImage')
            dispatch('getQuote')
            dispatch('getWeather')
        }
    }
})

export default store