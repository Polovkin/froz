import Vue from 'vue'
import Vuex from 'vuex'
import {TYPES} from '@/types'

Vue.use(Vuex)

const url = 'https://data.jsdelivr.com/v1/'

export default new Vuex.Store({
    state: {
        data: [],
        errorMsg: null,
        packageName: '',
        details: {
            state: false,
            name: ''
        },
        packageDetails:[],
        type: TYPES.POPULAR,
        headersPopular: [
            {
                text: 'Most popular packages',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {text: 'Type', value: 'type'},
            {text: 'Hits', value: 'hits'},
        ],
        headerPackage: [
            {
                text: 'Versions',
                align: 'start',
                value: 'version',
            },
        ]
    },

    mutations: {
        SET_FETCHED_DATA(s, data) {
            s.data = data
        },
        SET_SEARCH_TYPE(s, data) {
            s.type = data
        },
        SET_PACKAGE_NAME(s, data) {
            s.packageName = data
        },
        SET_PACKAGE_DETAILS(s, data) {
            s.packageDetails = data
        },
        SET_POPUP(s, payload) {
            s.details = {...payload}
        },
        SET_ERROR_MSG(s, payload) {
            s.errorMsg = payload
        }
    },
    actions: {
        async FETCH_DATA({commit}) {
            const response = await fetch(`${url}stats/packages`)
            const json = await response.json()
            if (response.status === 200) {
                commit('SET_SEARCH_TYPE', TYPES.POPULAR)
                commit('SET_FETCHED_DATA', json)
            } else {
                commit('SET_ERROR_MSG', json.message)
                setTimeout(() => {
                    commit('SET_ERROR_MSG', null)
                },3000)
            }
        },
        async SEARCH_PACKAGE({commit}, payload) {
            try {
                const response = await fetch(`${url}package/npm/${payload.name}`)
                const json = await response.json()

                if (response.status === 200) {
                    commit('SET_SEARCH_TYPE', payload.type)
                    commit('SET_PACKAGE_NAME', payload.name)
                    commit('SET_FETCHED_DATA', json)
                } else {
                    commit('SET_ERROR_MSG', json.message)
                    setTimeout(() => {
                        commit('SET_ERROR_MSG', null)
                    },2000)
                }
            } catch (e) {
                console.log(e);
                throw e
            }
        },
        async SEARCH_PACKAGE_DETAILS({commit}, payload) {
            try {
                const response = await fetch(`${url}package/npm/${payload.name}/stats`)
                const json = await response.json()

                if (response.status === 200) {
                    commit('SET_PACKAGE_DETAILS', json)
                } else {
                    commit('SET_ERROR_MSG', json.message)
                    setTimeout(() => {
                        commit('SET_ERROR_MSG', null)
                    },2000)
                }
            } catch (e) {
                console.log(e);
                throw e
            }
        }
    },
    getters: {
        GET_DATA: (state) => {
            let arr = []
            switch (state.type) {
                case TYPES.POPULAR:
                    return state.data
                case TYPES.PACKAGE:
                    state.data.versions.forEach(e => arr.push({version: e}))
                    return arr
                default:
                    return state.data
            }
        },
        GET_HEADERS: state => {
            switch (state.type) {
                case TYPES.POPULAR:
                    return state.headersPopular
                case TYPES.PACKAGE:
                    return state.headerPackage
                default:
                    return state.headersPopular
            }
        },

    }
})

