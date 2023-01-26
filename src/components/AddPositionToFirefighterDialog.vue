<template>
  <div>
    <v-dialog width="20rem" v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            style="margin: 5px;"
            class="primary"
            color="white"
            v-on="on"
            v-bind="attrs"
        >
          Dodaj Pozycję Strażakowi
        </v-btn>
      </template>
      <v-card color="grey darken-2">
        <v-card-title class="justify-center white--text">
          Dodanie Pozycji
        </v-card-title>
        <div class="justify-center">
          <v-autocomplete
              :items="positions"
              v-model="selectedPosition"
              return-object
              item-text="name"
              dark
              label="Pozycja">
          </v-autocomplete>
          <v-autocomplete
              :items="firefighters"
              v-model="selectedFirefighter"
              return-object
              :item-text="getFullName"
              dark
              label="Strażak">
            Strażak
          </v-autocomplete>
        </div>
        <v-card-actions class="justify-center">
          <v-btn dark color="indigo" @click="addPositionToFirefighter()">
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
            Pozycja została poprawnie dodana
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
            Brakuje danych potrzebnych do dodania pozycji
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </div>
</template>

<script>
import {addPositionToFirefighter} from "@/api/api";

export default {
  name: "AddPositionToFirefighterDialog",
  data() {
    return {
      dialog: false,
      snackbarSuccess: false,
      snackbarError: false,
      selectedPosition: null,
      selectedFirefighter: null,
    }
  },
  computed: {
    firefighters() {
      return this.$store.getters.getFirefighters
    },
    positions() {
      return this.$store.getters.getPositions
    }
  },
  methods: {
    addPositionToFirefighter() {
      if (this.selectedFirefighter != null && this.selectedPosition != null) {
        addPositionToFirefighter(this.selectedFirefighter.id, this.selectedPosition.id).then(() => {
          this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
          this.selectedPosition = null
          this.selectedFirefighter = null
          this.snackbarSuccess = true
          this.dialog = false
        }
    )}else this.snackbarError = true
    },
    getFullName(item) {
      return `${item.name} ${item.lastName} - ${item.workNumber}`;
    },
  },
}
</script>

<style scoped>


</style>