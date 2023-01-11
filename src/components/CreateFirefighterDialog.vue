<template>
  <v-form>
    <v-dialog width="50%" v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="primary"
            color="white"
            v-on="on"
            v-bind="attrs"
        >
          Dodaj Strażaka
        </v-btn>
      </template>
      <v-card color="grey darken-2">
        <v-card-title class="justify-center white--text">
          Dodanie Strażaka
        </v-card-title>
        <v-text-field
            dark
            label="Imię"
            v-model="newFirefighter.name"
        ></v-text-field>
        <v-text-field
            dark
            label="Nazwisko"
            v-model="newFirefighter.lastName"
        ></v-text-field>
        <v-text-field
            type="number"
            dark
            label="Numer Służbowy"
            v-model="newFirefighter.workNumber"
        ></v-text-field>
        <v-text-field
            dark
            label="Ranga"
            v-model="newFirefighter.rang"
        ></v-text-field>
        <v-text-field
            dark
            label="Jednostka"
            v-model="newFirefighter.unit"
        ></v-text-field>
        <v-card-actions class="justify-center">
          <v-btn dark color="indigo" @click="createFirefighter()">
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
            Strażak został poprawnie dodany
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
            Brakuje danych potrzebnych do dodania strażaka
          </div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </v-form>
</template>

<script>
import {createFirefighter} from "@/api/api";

export default {
  name: "CreateFirefighterDialog",
  data() {
    return {
      newFirefighter: {
        name: '',
        lastName: '',
        workNumber: '',
        rang: '',
        unit: ''
      },
      dialog: false,
      snackbarSuccess: false,
      snackbarError: false,
    }
  },
  methods: {
    createFirefighter() {
      if (this.newFirefighter.name !== ''
          && this.newFirefighter.lastName !== ''
          && this.newFirefighter.workNumber !== ''
          && this.newFirefighter.rang !== ''
          && this.newFirefighter.unit !== '') {
        createFirefighter(this.newFirefighter).then(res => {
          this.$store.dispatch('fetchFirefighters', res.data)
          this.dialog = false;
          this.snackbarSuccess = true;
          this.newFirefighter.name = '';
          this.newFirefighter.lastName = '';
          this.newFirefighter.workNumber = '';
          this.newFirefighter.rang = '';
          this.newFirefighter.unit = '';
        })
      } else this.snackbarError = true;
    },
  }
}
</script>

<style scoped>

.v-snackbar {
  margin: 10px;
  text-align: center;
  align-content: center;
}
.v-dialog .v-text-field {
  margin: 10px;
}

</style>