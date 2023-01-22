import VueRouter from "vue-router";
import Vue from "vue";
import ScheduleView from "@/Views/ScheduleView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/schedule',
        name: 'Schedule',
        component: ScheduleView,
    },
]



const router = new VueRouter({
    mode: 'history',
    routes
})

export default router