<template>
  <div>
    <v-dialog width="40rem" v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            style="margin: 5px;"
            class="primary"
            color="white"
            v-on="on"
            v-bind="attrs"
        >
          Utwórz Harmonogram
        </v-btn>
      </template>
      <v-card color="grey darken-2">
        <v-card-title class="justify-center white--text">
          Tworzenie Harmonogramu
        </v-card-title>
        <v-row justify="center" style="margin: 10px">
          <v-date-picker locale="pl" v-model="newSchedule.startDate">Początek Harmonogramu</v-date-picker>
          <v-date-picker locale="pl" v-model="newSchedule.endDate">Koniec Harmonogramu</v-date-picker>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn dark color="indigo" @click="createSchedule()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        color="success"
        rounded
        elevation="8"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>mdi-check-circle</v-icon>
        <v-layout column>
          <div>
            Utworzono Harmonogram
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
    <v-snackbar
        v-model="snackbarError"
        right
        color="error"
        rounded
        elevation="8"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>mdi-alert-circle</v-icon>
        <v-layout column>
          <div>
            Brakuje danych potrzebnych do utworzenia Harmonogramu
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
    <v-snackbar
        v-model="errorScheduleAlreadyExists"
        right
        color="error"
        rounded
        elevation="8"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>mdi-alert-circle</v-icon>
        <v-layout column>
          <div>
            Harmonogram już istnieje
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </div>
</template>

<script>
import {createSchedule} from "@/api/api";

export default {
  name: "CreateScheduleView",
  data() {
    return {
      dialog: false,
      snackbarSuccess: false,
      snackbarError: false,
      errorScheduleAlreadyExists: false,
      newSchedule: {
        startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
    }
  },
  methods: {
    createSchedule() {
      if (this.$store.getters.getSchedule !== undefined) {
        this.dialog = false;
        this.errorScheduleAlreadyExists = true;
        return null;
      }
      let currentDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      if (this.newSchedule.startDate >= currentDate && this.newSchedule.startDate < this.newSchedule.endDate) {
        createSchedule(this.newSchedule).then(() => {
          this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
          this.newSchedule = {
            startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          }
          this.dialog = false;
          this.snackbarSuccess = true;
        })
      } else this.snackbarError = true;
    }
  },
}
</script>

<style scoped>

</style>