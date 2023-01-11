<template>
  <div>
    <v-dialog width="50%" v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            style="margin: 5px;"
            class="primary"
            color="white"
            v-on="on"
            v-bind="attrs"
        >
          Dodaj Pozycję
        </v-btn>
      </template>
      <v-card color="grey darken-2">
        <v-card-title class="justify-center white--text">
          Dodanie Pozycji
        </v-card-title>
        <v-text-field
            dark
            label="Nazwa"
            v-model="newPosition.name"
        ></v-text-field>
        <v-card-actions class="justify-center">
          <v-btn dark color="indigo" @click="createPosition()">
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
import {createPosition} from "@/api/api";

export default {
  name: "CreatePositionDialog",
  data() {
    return {
      dialog: false,
      snackbarSuccess: false,
      snackbarError: false,
      newPosition: {
        name: ''
      },
    }
  },
  methods: {
    createPosition() {
      if (this.newPosition.name !== '') {
        createPosition(this.newPosition).then(() => {
              this.dialog = false;
              this.snackbarSuccess = true;
              this.newPosition.name = ''
            }
        )
      } else this.snackbarError = true
    }
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