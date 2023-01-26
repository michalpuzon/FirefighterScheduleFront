import VueRouter from "vue-router";
import Vue from "vue";
import ScheduleView from "@/viewComponents/ScheduleView";
import FirefightersListView from "@/viewComponents/FirefightersListView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/schedule',
        name: 'Schedule',
        component: ScheduleView,
    },
    {
        path: '/firefighters',
        name: 'FirefightersList',
        component: FirefightersListView,
    },
]



const router = new VueRouter({
    mode: 'history',
    routes
})

export default router