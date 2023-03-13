import Vue from "vue";
import Vuex from 'vuex';
import {getAllFirefighters, getAllPositions, getAllSchedules, getAllShifts} from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firefighters: [],
        positions: [],
        schedule: null,
        shifts: [],
        workDays: [],
        currentFirefighter: null,
        token: null,
    },
    mutations: {
        setFirefighters(state, firefighters) {
            state.firefighters = firefighters
        },
        setPositions(state, positions) {
            state.positions = positions
        },
        setSchedule(state, schedule) {
            state.schedule = schedule
        },
        setShifts(state, shifts) {
            state.shifts = shifts
        },
        setWorkDays(state, workDays) {
            state.workDays = workDays
        },
        setCurrentFirefighter(state, firefighter) {
            state.currentFirefighter = firefighter
        },
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        fetchFirefighters(context) {
            return getAllFirefighters()
                .then(response => {
                    context.commit("setFirefighters", response.data)
                })
        },
        fetchPositions(context) {
            return getAllPositions()
                .then(response => {
                    context.commit('setPositions', response.data)
                })
        },
        fetchSchedule(context) {
            return getAllSchedules().then(response => {
                context.commit('setSchedule', response.data[0])
            })
        },
        fetchShifts(context) {
            return getAllShifts().then(response => {
                context.commit('setShifts', response.data)
            })
        }
    },
    getters: {
        getFirefighters(state) {
            return state.firefighters
        },
        getPositions(state) {
            return state.positions
        },
        getSchedule(state) {
            return state.schedule
        },
        getShifts(state) {
            return state.shifts
        },
        getCurrentFirefighter(state) {
            return state.currentFirefighter
        },
        getToken(state) {
            return state.token
        }
    }
})