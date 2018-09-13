import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../utils/firebaseInit'
import axios from 'axios'

vue.use(vuex)

let store = new vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
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
                    commit('setUser', user)
                    router.push('/dashboard')
                } else {
                    router.push('/')
                }
            })
        }
    }
})

export default store