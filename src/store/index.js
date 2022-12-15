import Vue from "vue";
import Vuex from 'vuex';
import {getAllFirefighters} from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firefighters: []
    },
    mutations: {
        setFirefighters(state, firefighters){
            state.firefighters = firefighters
        }
    },
    actions: {
        fetchFirefighters(context){
            return getAllFirefighters()
                .then(response => {
                    context.commit("setFirefighters", response.data)
                })
        }
    },
    getters: {
        getFirefighters(state){
            return state.firefighters
        }
    }
})