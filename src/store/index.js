import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = 'https://data.jsdelivr.com/v1/'

export default new Vuex.Store({
    state: {
        fetchedData: [],
        packageName: 'jquery',
        type:'popular',
    },

    mutations: {
        SET_FETCHED_DATA(s, data) {
            s.fetchedData = data
        },
        SET_SEARCH_TYPE(s, data) {
            s.type = data
        }
    },
    actions: {
        async FETCH_DATA({commit}) {
            const response = await fetch(`${url}stats/packages`)
            const json = await response.json()
            commit('SET_FETCHED_DATA', json)
        },
        async SEARCH_PACKAGE({commit},data) {
            const response = await fetch(`${url}package/npm/${data}`)
            const json = await response.json()
            console.log(json);
            commit('SET_SEARCH_TYPE', 'test')
            //commit('SET_FETCHED_DATA', json)
        }
    },
    modules: {}
})

