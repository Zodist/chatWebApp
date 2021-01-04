import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = '/api'

export default new Vuex.Store({
    state: {
        accessToken: null
    },
    getters: {

    },
    mutations: {
        LOGIN(state, { accessToken }) {
            state.accessToken = accessToken
        },
        LOGOUT(state) {
            state.accessToken = null
        }
    },
    actions: {
        LOGIN(store, { email, password }) {
            return axios.post(`${resourceHost}/login`, { email, password })
                .then(({ data }) => store.commit('LOGIN', data))
        },
        LOGOUT(store) {
            store.commit('LOGOUT')
        }
    }
})