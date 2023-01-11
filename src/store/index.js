import Vue from "vue";
import Vuex from 'vuex';
import {getAllFirefighters, getAllPositions} from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firefighters: [],
        positions: [],
    },
    mutations: {
        setFirefighters(state, firefighters){
            state.firefighters = firefighters
        },
        setPositions(state, positions) {
            state.positions = positions
        }
    },
    actions: {
        fetchFirefighters(context){
            return getAllFirefighters()
                .then(response => {
                    context.commit("setFirefighters", response.data)
                })
        },
        fetchPositions(context){
            return getAllPositions()
                .then(response => {
                    context.commit('setPositions', response.data)
                })
        }
    },
    getters: {
        getFirefighters(state){
            return state.firefighters
        },
        getPositions(state){
            return state.positions
        }
    }
})