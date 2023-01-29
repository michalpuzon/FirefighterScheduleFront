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
          <v-date-picker locale="pl" v-model="startDate">Początek Harmonogramu</v-date-picker>
          <v-date-picker locale="pl" v-model="endDate">Koniec Harmonogramu</v-date-picker>
        </v-row>
        <v-row justify="center" style="margin: 10px">
          <v-combobox
              v-model="selectedPositions"
              multiple
              :items="positions"
              item-text="name"
              label="Potrzebne stanowiska"
              dark
          ></v-combobox>
        </v-row>
        <v-row justify="center" style="margin: 10px">
          <v-text-field dark type="number" label="liczba strażaków na służbie" v-model="fireFightersLimit"></v-text-field>
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
            Dane są nie uzupełnione lub podane daty się nie zgadzają
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
      fireFightersLimit: 5,
      selectedPositions: [],
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      if (this.startDate >= currentDate && this.startDate < this.endDate && this.selectedPositions !== [] && this.fireFightersLimit > 0 && this.fireFightersLimit < 10) {
        createSchedule(this.startDate, this.endDate, this.selectedPositions.map(position => position.id), this.fireFightersLimit).then(() => {
          this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
          this.startDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          this.endDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          this.dialog = false;
          this.snackbarSuccess = true;
        })
      } else this.snackbarError = true;
    }
  },
  computed: {
    positions() {
      return this.$store.getters.getPositions
    }
  }
}
</script>

<style scoped>

</style>