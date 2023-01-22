<template>
  <v-app>
    <v-app-bar
        app
        color="grey"
        dark
    >
      <create-firefighter-dialog/>
      <create-position-dialog/>
      <create-schedule-view/>
      <v-btn class="primary" v-if="this.$store.getters.getSchedule !== null && this.$store.getters.getSchedule !== undefined " @click="goToScheduleView">Harmonogram</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import CreateFirefighterDialog from "@/components/CreateFirefighterDialog";
import CreatePositionDialog from "@/components/CreatePositionDialog";
import CreateScheduleView from "@/components/CreateScheduleView";

export default {
  name: 'App',

  components: {
    CreateScheduleView,
    CreatePositionDialog,
    CreateFirefighterDialog
  },

  data: () => ({}),
  methods: {
    goToScheduleView(){
      this.$router.push('/schedule')
    }
  },
  mounted() {
    this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
    this.$store.dispatch('fetchShifts').catch((error) => alert(error.response.data))
    this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
  }
};
</script>
