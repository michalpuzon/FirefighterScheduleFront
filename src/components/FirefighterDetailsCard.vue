<template>
  <v-dialog
      v-model="dialog"
      max-width="500px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          v-if="firefighter !== null "
          color="primary"
          v-bind="props"
          @click="open()"
          icon
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
          v-else
          color="primary"
          v-bind="props"
          @click="open()"
          icon
      >
        <v-icon large>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline" style="background-color: #1976D2; color: #fff;">
        {{ selectedFirefighter?.name }} {{ selectedFirefighter?.lastName }}
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Imię:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ selectedFirefighter?.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Nazwisko:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ selectedFirefighter?.lastName }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Numer służbowy:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ selectedFirefighter?.workNumber }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Stopień służbowy:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ selectedFirefighter?.rang }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Jednostka:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ selectedFirefighter?.unit }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Zmiana:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ selectedFirefighter?.shift?.number }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Zaplanowane godziny:</v-list-item-title>
              <v-list-item-subtitle class="ma-1">{{ countHours() }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold" style="font-size: 18px;">Pozycje:</v-list-item-title>
              <v-list-item-subtitle>
                <v-list v-if="selectedFirefighter?.positions.length">
                  <v-list-item v-for="position in selectedFirefighter?.positions" :key="position.id"
                               class="position-item">
                    <v-list-item-content>
                      <v-list-item-title>{{ position.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list-item-subtitle v-else>Brak pozycji.</v-list-item-subtitle>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="dialog = false">Zamknij</v-btn>
        <v-btn
            v-if="this.$store.getters.getCurrentFirefighter?.role === 'ROLE_ADMIN' && this.selectedFirefighter?.role !== 'ROLE_ADMIN'"
            class="red darken-3" style="color: white" @click="deleteFirefighter">Usuń {{ selectedFirefighter?.name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {deleteFirefighter} from "@/api/api";

export default {
  props: {
    firefighter: {
      type: Object,
      require: false,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      selectedFirefighter: this.firefighter? this.firefighter: this.$store.getters.getCurrentFirefighter,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    countHours() {
      const workDays = this.selectedFirefighter?.workDays;
      if (!workDays) return 0;
      return Object.keys(workDays).length * 24;
    },
    open() {
      this.dialog = true;
      if (this.selectedFirefighter === null) {
        this.selectedFirefighter = this.$store.getters.getCurrentFirefighter
      }
    },
    deleteFirefighter() {
      deleteFirefighter(this.selectedFirefighter.id).then(() => {
        this.dialog = false
        this.selectedFirefighter = null
        this.$store.dispatch('fetchFirefighters')
      })
    }
  },
};
</script>
<style scoped>
.dialog-card {
  max-width: 600px;
  margin: 0 auto;
}

.dialog-title {
  background-color: #1976D2;
  color: #fff;
}

.dialog-subtitle {
  font-size: 18px;
  margin-bottom: 4px;
}

.dialog-item {
  padding-top: 8px;
  padding-bottom: 8px;
}

.dialog-item-title {
  font-weight: bold;
  font-size: 18px;
}

.dialog-item-subtitle {
  font-size: 16px;
  margin-top: -4px;
}

.position-item {
  width: auto;
  border: 1px solid #ccc;
  margin-bottom: 2px;
}

.dialog-item-subtitle:not(:last-child) {
  margin-bottom: 8px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.dialog-button {
  color: #fff;
  background-color: #1976D2;
  margin-left: 8px;
}

.dialog-button:hover {
  background-color: #1565C0;
}
</style>