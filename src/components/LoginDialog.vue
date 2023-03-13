<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Logowanie</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
              label="Numer służbowy"
              type="text"
              v-model="workNumber"
              :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
              label="Hasło"
              type="password"
              v-model="password"
              :rules="[rules.required]"
          ></v-text-field>
          <v-btn color="primary" type="submit">Zaloguj</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {login, me} from "@/api/api";

export default {
  data() {
    return {
      dialog: false,
      workNumber: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    login() {
      let authRequest = {
        workNumber: this.workNumber,
        password: this.password
      }
      login(authRequest)
          .then(response => {
            localStorage.setItem('token', response.data.token);
            let token = localStorage.getItem('token')
            this.$store.commit('setToken', token)
            this.$router.push('/');
            this.closeDialog();

            this.$store.dispatch('fetchShifts').catch((error) => alert(error.response.data))
            this.$store.dispatch('fetchSchedule').catch((error) => alert(error.response.data))
            this.$store.dispatch('fetchPositions').catch((error) => alert(error.response.data))
            this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
            me().then(res => {
              this.$store.commit('setCurrentFirefighter', res.data)
            })
            this.workNumber = ''
            this.password = ''
          })
          .catch(error => {
            console.error(error);
            alert('Niepoprawny numer służbowy lub hasło');
          });
    }

  },
};
</script>