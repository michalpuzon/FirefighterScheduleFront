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
          <v-select
              dark
              item-text="name"
              v-model="selectedPositions"
              :items="positions"
              multiple
              label="Wybierz wymagane pozycje"
              return-object
          ></v-select>
        </v-row>
          <form v-for="position in selectedPositions" :key="position.id" class="form-container">
            <div class="form-item">
              {{ position.name }}:
            </div>
            <div class="form-input">
              <v-text-field dark type="number" v-model.number="position.quantity" />
            </div>
          </form>
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
      selectedPositions: [],
      startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
  methods: {
    createSchedule() {
      let numberOfFirefighters = 0;
      let requiredPositions = []
      this.selectedPositions.forEach(position => {
        numberOfFirefighters += position.quantity
        for (let i = 0; i < position.quantity; i++) {
          requiredPositions.push({
            id: position.id,
            name: position.name
          });
        }
      });
      if (this.$store.getters.getSchedule !== undefined) {
        this.dialog = false;
        this.errorScheduleAlreadyExists = true;
        return null;
      }
      let currentDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      if (this.startDate >= currentDate && this.startDate < this.endDate && this.selectedPositions !== [] && this.numberOfFirefighters > 0 && this.numberOfFirefighters < this.firefighters.length) {
        createSchedule(this.startDate, this.endDate, requiredPositions.map(position => position.id), numberOfFirefighters).then(() => {
          this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
          this.startDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          this.endDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
          this.selectedPositions = []
          this.dialog = false;
          this.snackbarSuccess = true;
        })
      } else this.snackbarError = true;
    }
  },
  computed: {
    positions() {
      return this.$store.getters.getPositions
    },
    firefighters() {
      return this.$store.getters.getFirefighters;
    }
  }
}
</script>

<style scoped>

.form-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.form-item {
  color: white;
  margin-left: 5px;
  margin-right: 10px;
}

.form-input {
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  flex-grow: 1;
}

</style>