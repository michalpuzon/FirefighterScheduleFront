<template>
  <v-form>
    <v-dialog width="25rem" v-model="dialog" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="primary ma-2"
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
            class="ma-5"
            dark
            label="Imię"
            v-model="newFirefighter.name"
        ></v-text-field>
        <v-text-field
            class="ma-5"
            dark
            label="Nazwisko"
            v-model="newFirefighter.lastName"
        ></v-text-field>
        <v-text-field
            class="ma-5"
            type="number"
            dark
            label="Numer Służbowy"
            v-model="newFirefighter.workNumber"
        ></v-text-field>
        <v-text-field
            class="ma-5"
            dark
            label="Stopień służbowy"
            v-model="newFirefighter.rang"
        ></v-text-field>
        <v-text-field
            class="ma-5"
            dark
            label="Jednostka"
            v-model="newFirefighter.unit"
        ></v-text-field>
        <v-text-field
            class="ma-5"
            dark
            label="Hasło"
            v-model="newFirefighter.password"
        ></v-text-field>
        <v-select
            v-model="newFirefighter.role"
            class="ma-5"
            dark
            item-text="name"
            item-value="value"
            label="Rola"
            :items="roles"></v-select>
        <v-radio-group
            v-if="newFirefighter.role && newFirefighter.role !== 'ROLE_ADMIN'"
            class="ma-5" v-model="newFirefighter.shiftId" row>
          <v-radio
              dark
              v-for="shift in shifts"
              :key="shift.id"
              :label="`Zmiana: ${shift.number}`"
              :value="shift.id"
          ></v-radio>

        </v-radio-group>
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
        unit: '',
        shiftId: '',
        role: '',
        password: '',
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
          && this.newFirefighter.unit !== ''
          && this.newFirefighter.role !== ''
          && this.newFirefighter.password !== '') {
        createFirefighter(this.newFirefighter).then(res => {
          this.$store.dispatch('fetchFirefighters', res.data)
          this.dialog = false;
          this.snackbarSuccess = true;
          this.newFirefighter.name = '';
          this.newFirefighter.lastName = '';
          this.newFirefighter.workNumber = '';
          this.newFirefighter.rang = '';
          this.newFirefighter.unit = '';
          this.newFirefighter.shiftId = '';
          this.newFirefighter.role = '';
          this.newFirefighter.password = '';
          this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
        })
      } else this.snackbarError = true;
    },
  },
  computed: {
    shifts() {
      if (this.$store.getters.getCurrentFirefighter?.role === "ROLE_ADMIN")
      return this.$store.getters.getShifts
      else return this.$store.getters.getShifts.filter(s => s.id === this.$store.getters.getCurrentFirefighter?.shift?.id)
    },
    roles() {
      return this.$store.getters.getCurrentFirefighter?.role === 'ROLE_ADMIN' ? [
        {name: 'Strażak', value: 'ROLE_FIREFIGHTER'},
        {name: 'Dowódca zmiany', value: 'ROLE_COMMANDER'},
        {name: 'Dowódca jednostki', value: 'ROLE_ADMIN'},
      ] : [{name: 'Strażak', value: 'ROLE_FIREFIGHTER'}]
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

</style>