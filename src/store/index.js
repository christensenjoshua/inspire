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

    },
    mutations: {

    },
    actions: {

    }
})

export default store