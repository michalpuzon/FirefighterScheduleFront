<template>
  <v-data-table
      :headers="headers"
      :items="firefighters"
      :search="search"
      :items-per-page="10"
      class="elevation-1 ma-8"
  >
    <template v-slot:[`item.positions`]="{ item }">
      <div v-for="(position, index) in item.positions" :key="position.id">
        - {{position.name}}
        <v-btn small icon @click="removePosition(item.id, position.id)"><v-icon>mdi-delete</v-icon></v-btn>
        <div v-if="index !== item.positions.length -1"/>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import {removePositionFromFirefighter} from "@/api/api";

export default {
  name: "FirefightersListView",
  data() {
    return {
      search: '',
      headers: [
        {
            text: 'Imię',
            align: 'start',
            value: 'name'
        },
        {
          text: 'Nazwisko',
          value: 'lastName',
        },
        {
          text: 'Numer Służbowy',
          value: 'workNumber',
          sortable: false,
        },
        {
          text: 'Stanowisko',
          value: 'rang',
          sortable: false,
        },
        {
          text: 'Jednostka',
          value: 'unit',
          sortable: false,
        },
        {
          text: 'Zmiana',
          value: 'shiftId',
        },
        {
          text: "Pozycje",
          value: 'positions',
          sortable: false,
        }
      ]
    }
  },
  computed: {
    firefighters() {
      return this.$store.getters.getFirefighters
    }
  },
  methods: {
    async removePosition(firefighterId, positionId) {
      removePositionFromFirefighter(firefighterId, positionId).then(await this.$store.dispatch('fetchFirefighters'));
    }
  }
}
</script>

<style scoped>

</style>