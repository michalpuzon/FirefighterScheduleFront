<template>
  <v-data-table
      :sort-by="['role', 'name']"
      :custom-sort="customSort"
      :headers="headers"
      :items="firefighters"
      :search="search"
      :items-per-page="15"
      class="elevation-1 ma-8"
  >
    <template v-slot:[`item.positions`]="{ item }">
      <div v-for="(position, index) in item.positions" :key="position.id">
        - {{ position.name }}
        <v-btn small icon @click="removePosition(item.id, position.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <div v-if="index !== item.positions.length -1"/>
      </div>
    </template>
    <template slot="item.role" slot-scope="{ item }">
      {{ getRoleName(item.role) }}
    </template>
    <template v-slot:[`item.workDays`]="{ item }">
      {{ countHours(item) }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <firefighter-details-card :firefighter="item"/>
    </template>
  </v-data-table>
</template>


<script>
import {removePositionFromFirefighter} from "@/api/api";
import FirefighterDetailsCard from "@/components/FirefighterDetailsCard";

export default {
  name: "FirefightersListView",
  components: {FirefighterDetailsCard},
  data() {
    return {
      search: '',
      dialog: false,
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
          text: 'Stopień służbowy',
          value: 'rang',
          sortable: false,
        },
        {
          text: 'Jednostka',
          value: 'unit',
        },
        {
          text: 'Zmiana',
          value: 'shift.number',
        },
        {
          text: "Pozycje",
          value: 'positions',
          sortable: false,
        },
        {
          text: "Zaplanowane godziny",
          value: 'workDays'
        },
        {
          text: "Rola",
          value: 'role'
        },
        {
          text: 'Akcje',
          value: 'actions'
        }
      ],
      roleNames: {
        ROLE_ADMIN: 'Admin',
        ROLE_COMMANDER: 'Dowódca zmiany',
        ROLE_FIREFIGHTER: 'Strażak'
      }
    }
  },
  computed: {
    firefighters() {
      if (this.$store.getters.getCurrentFirefighter?.role === "ROLE_ADMIN")
        return this.$store.getters.getFirefighters
      else
        return this.$store.getters.getFirefighters.filter(f => f.shift?.id === this.$store.getters.getCurrentFirefighter?.shift?.id)
    },
  },
  methods: {
    async removePosition(firefighterId, positionId) {
      removePositionFromFirefighter(firefighterId, positionId).then(await this.$store.dispatch('fetchFirefighters'));
    },
    countHours(item) {
      return Object.keys(item.workDays).length * 24;
    },
    getRoleName(role) {
      return this.roleNames[role] || role;
    },
    customSort(items, sortBy, sortDesc) {
      const order = {
        ROLE_ADMIN: 1,
        ROLE_COMMANDER: 2,
        ROLE_FIREFIGHTER: 3,
      };

      return items.sort((a, b) => {
        const sortA = a[sortBy[0]];
        const sortB = b[sortBy[0]];

        if (sortA === sortB) {
          return a.name.localeCompare(b.name);
        } else {
          const sortResult = order[sortA] - order[sortB];
          return sortDesc[0] ? -sortResult : sortResult;
        }
      });
    },
  }
}
</script>

<style scoped>
.v-data-table {
  opacity: 0.95;
}

</style>