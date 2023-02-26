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
      <create-schedule-view
          v-if="this.$store.getters.getFirefighters.length > 0 && (this.$store.getters.getSchedule === null || this.$store.getters.getSchedule === undefined) "/>
      <v-btn class="primary ma-1" v-if="$route.name !== 'FirefightersList'" @click="goToFirefightersView">Strażacy</v-btn>
      <v-btn class="primary ma-1"
             v-if="this.$store.getters.getSchedule !== null && this.$store.getters.getSchedule !== undefined "
             @click="goToScheduleView">Harmonogram
      </v-btn>
      <v-btn class="red darken-3" style="margin-left: auto" v-if="$route.name === 'Schedule'" @click="showModal = true">
        Usuń Harmonogram
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
      <delete-confirm-modal :show-modal="showModal" @confirm="deleteSchedule" @close="showModal = false"/>
    </v-main>
    <v-footer
        style="opacity: 0.95"
        class="footer"
        color="grey"
        dark
        padless
    >
      <v-card class="flex justify-center"
              color="grey"
              flat
              tile>
        <v-card-text class="text-center" style="color: white">Gloria Deo, auxilio proximo. - Bogu na chwałę, bliźniemu
          na ratunek.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

import CreateFirefighterDialog from "@/components/CreateFirefighterDialog";
import CreatePositionDialog from "@/components/CreatePositionDialog";
import CreateScheduleView from "@/components/CreateScheduleView";
import AddPositionToFirefighterDialog from "@/components/AddPositionToFirefighterDialog";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import {removeSchedule} from "@/api/api";

export default {
  name: 'App',

  components: {
    DeleteConfirmModal,
    AddPositionToFirefighterDialog,
    CreateScheduleView,
    CreatePositionDialog,
    CreateFirefighterDialog
  },

  data() {
    return {
      showModal: false
    }
  },
  methods: {
    goToScheduleView() {
      if (this.$route.name !== 'Schedule')
        this.$router.push('/schedule')
    },
    goToFirefightersView() {
      if (this.$route.name !== 'FirefightersList')
        this.$router.push('/firefighters')
    },
    backToMenu() {
      if (this.$route.name !== 'Home')
        this.$router.push('/')
    },
    deleteSchedule() {
      removeSchedule(this.$store.getters.getSchedule.id).then(() => {
            this.showModal = false
            this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
            this.$router.push('/')
          }
      )
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

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
