<template>
  <v-app style="background-image: url(https://cdn.pixabay.com/photo/2019/04/23/12/57/brand-4149479_960_720.jpg)">
    <v-app-bar
        app
        color="#E0E0E0"
        style="opacity: 0.95"
        dark
    >
      <v-btn class="primary ma-2" @click="backToMenu" v-if="$route.name !== 'Home'">Strona Główna</v-btn>
      <create-firefighter-dialog v-if="$route.name === 'FirefightersList' && !isFirefighter"/>
      <create-position-dialog v-if="$route.name === 'FirefightersList' && !isFirefighter"/>
      <add-position-to-firefighter-dialog v-if="$route.name === 'FirefightersList' && !isFirefighter"/>
      <create-schedule-view
          v-if="this.$store.getters.getFirefighters.length > 0 && (this.$store.getters.getSchedule === null || this.$store.getters.getSchedule === undefined) && isAdmin"/>
      <v-btn class="primary ma-2" v-if="$route.name !== 'FirefightersList' && !isFirefighter && isUserLogged"
             @click="goToFirefightersView">Strażacy
      </v-btn>
      <v-btn class="primary ma-2"
             v-if="this.$store.getters.getSchedule !== null && this.$store.getters.getSchedule !== undefined && isUserLogged"
             @click="goToScheduleView">Harmonogram
      </v-btn>
      <v-spacer/>
      <v-btn class="red darken-3 ma-2" v-if="$route.name === 'Schedule' && isAdmin" @click="showModal = true">
        Usuń Harmonogram
      </v-btn>
      <v-btn v-show="!isUserLogged" class="primary ma-2" @click="openLoginDialog">Zaloguj się</v-btn>
      <v-btn v-show="isUserLogged" class="red darken-3 ma-2" @click="logout">Wyloguj się</v-btn>
      <firefighter-details-card v-if="isUserLogged"/>
    </v-app-bar>
    <v-main>
      <router-view/>
      <LoginDialog ref="loginDialog"/>
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
              color="#E0E0E0"
              flat
              tile>
        <v-card-text class="text-center" style="color: black">Gloria Deo, auxilio proximo. - Bogu na chwałę, bliźniemu
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
import {me, removeSchedule} from "@/api/api";
import LoginDialog from "@/components/LoginDialog";
import FirefighterDetailsCard from "@/components/FirefighterDetailsCard";

export default {
  name: 'App',

  components: {
    FirefighterDetailsCard,
    DeleteConfirmModal,
    AddPositionToFirefighterDialog,
    CreateScheduleView,
    CreatePositionDialog,
    CreateFirefighterDialog,
    LoginDialog,
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
    openLoginDialog() {
      this.$refs.loginDialog.openDialog();
    },
    deleteSchedule() {
      removeSchedule(this.$store.getters.getSchedule.id).then(() => {
            this.showModal = false
            this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
            this.$router.push('/')
          }
      )
    },
    logout() {
      this.$store.commit('setToken', null)
      localStorage.removeItem('token')
      this.$store.commit('setCurrentFirefighter', null)
      this.$router.push('/')
    },
  },
  mounted() {
    this.$store.commit('setToken', localStorage.getItem('token'))
    if (this.$store.getters.getToken) {
      me().then(res => {
        this.$store.commit('setCurrentFirefighter', res.data)
      })
      this.$store.dispatch('fetchShifts').catch((error) => alert(error.response.data))
      this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
      this.$store.dispatch('fetchPositions').catch((error) => alert(error.response.data))
      this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
    }
  },
  computed: {
    isUserLogged() {
      return this.$store.getters.getToken
    },
    isAdmin() {
      return this.$store.getters.getCurrentFirefighter?.role === "ROLE_ADMIN"
    },
    isCommander() {
      return this.$store.getters.getCurrentFirefighter?.role === "ROLE_COMMANDER"
    },
    isFirefighter() {
      return this.$store.getters.getCurrentFirefighter?.role === "ROLE_FIREFIGHTER"
    }
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
