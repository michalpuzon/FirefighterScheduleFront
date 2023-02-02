<template>
  <v-app style="background-image: url(https://cdn.pixabay.com/photo/2019/04/23/12/57/brand-4149479_960_720.jpg)">
    <v-app-bar
        app
        color="grey"
        dark
    >
      <v-btn class="primary ma-1" @click="backToMenu" v-if="$route.name !== 'Home'">Strona Główna</v-btn>
      <create-firefighter-dialog v-if="$route.name === 'FirefightersList'"/>
      <create-position-dialog v-if="$route.name === 'FirefightersList'"/>
      <add-position-to-firefighter-dialog v-if="$route.name === 'FirefightersList'"/>
      <create-schedule-view v-if="this.$store.getters.getFirefighters.length > 0"/>
      <v-btn class="primary ma-1" @click="goToFirefightersView">Strażacy</v-btn>
      <v-btn class="primary ma-1" v-if="this.$store.getters.getSchedule !== null && this.$store.getters.getSchedule !== undefined " @click="goToScheduleView">Harmonogram</v-btn>

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
import AddPositionToFirefighterDialog from "@/components/AddPositionToFirefighterDialog";

export default {
  name: 'App',

  components: {
    AddPositionToFirefighterDialog,
    CreateScheduleView,
    CreatePositionDialog,
    CreateFirefighterDialog
  },

  data: () => ({}),
  methods: {
    goToScheduleView(){
      if (this.$route.name !== 'Schedule')
      this.$router.push('/schedule')
    },
    goToFirefightersView(){
      if (this.$route.name !== 'FirefightersList')
      this.$router.push('/firefighters')
    },
    backToMenu(){
      if (this.$route.name !== 'Home')
      this.$router.push('/')
    }
  },
  mounted() {
    this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
    this.$store.dispatch('fetchShifts').catch((error) => alert(error.response.data))
    this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
    this.$store.dispatch('fetchPositions').catch((error) => alert(error.response.data))
  }
};
</script>
<style>
#app {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
