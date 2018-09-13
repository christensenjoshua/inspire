import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../utils/firebaseInit'
import axios from 'axios'

let api = axios.create({
    baseURL: 'http://bcw-sandbox.herokuapp.com/api/',
    timeout: 5000
})
vue.use(vuex)

let store = new vuex.Store({
    state: {
        user: {},
        currImage: {},
        currQuote: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setImage(state, payload) {
            state.currImage = payload
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
                    commit('setUser', user)
                    router.push('/dashboard')
                } else {
                    router.push('/')
                }
            })
        },
        getImage({ commit, dispatch }) {
            api.get('images').then(res => {
                commit('setImage', res.data)
                document.getElementById('app').style.backgroundImage = "url('" + res.data.large_url + "'"
            }).catch(err => {
                console.error(err)
            })
        }
    }
})

export default store