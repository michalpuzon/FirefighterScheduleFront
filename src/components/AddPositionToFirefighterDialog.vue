<template>
  <div>
    <v-dialog width="20rem" v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="primary ma-2"
            color="white"
            v-on="on"
            v-bind="attrs"
        >
          Dodaj Pozycję Strażakowi
        </v-btn>
      </template>
      <v-card color="grey darken-2">
        <v-card-title class="justify-center white--text ma-2">
          Dodanie Pozycji
        </v-card-title>
        <div class="justify-center">
          <v-autocomplete
              class="autocomplete"
              :items="firefighters"
              v-model="selectedFirefighter"
              return-object
              :item-text="getFullName"
              dark
              label="Strażak">
            Strażak
          </v-autocomplete>
          <v-autocomplete
              class="autocomplete"
              multiple
              :disabled="!selectedFirefighter"
              :items="positions"
              v-model="selectedPositions"
              return-object
              item-text="name"
              dark
              label="Pozycja">
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
      selectedPositions: [],
      selectedFirefighter: null,
    }
  },
  watch: {},
  computed: {
    firefighters() {
      if (this.$store.getters.getCurrentFirefighter?.role === "ROLE_ADMIN")
        return this.$store.getters.getFirefighters
      else
        return this.$store.getters.getFirefighters.filter(f => f.shift?.id === this.$store.getters.getCurrentFirefighter?.shift?.id)
    },
    positions() {
      let positions = this.$store.getters.getPositions
      if (!this.selectedFirefighter) return positions
      return positions.filter(function (el) {
        return !this.selectedFirefighter.positions.some(p => p.id === el.id);
      }.bind(this));
    },

  },
  methods: {
    async addPositionToFirefighter() {
      if (this.selectedFirefighter != null && this.selectedPositions != null) {
        for (let position of this.selectedPositions) {
          addPositionToFirefighter(this.selectedFirefighter.id, position.id).then(async () => {
            await this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
          })
        }
        this.selectedPositions = []
        this.selectedFirefighter = null
        this.snackbarSuccess = true
        this.dialog = false
      } else this.snackbarError = true
    },
    getFullName(item) {
      return `${item.name} ${item.lastName} - ${item.workNumber}`;
    },
  },
}
</script>

<style scoped>
.autocomplete {
  margin: 10px;
}

</style>