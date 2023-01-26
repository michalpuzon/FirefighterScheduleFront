<template>
  <v-data-table
      :headers="headers"
      :items="firefighters"
      :items-per-page="10"
      class="elevation-1 ma-8"
  ></v-data-table>
</template>

<script>
export default {
  name: "FirefightersListView",
  data() {
    return {
      search: '',
      headers: [
        {
            text: 'Imię',
            align: 'start',
            sortable: true,
            value: 'name'
        },
        {
          text: 'Nazwisko',
          value: 'lastName'
        },
        {
          text: 'Numer Służbowy',
          value: 'workNumber'
        },
        {
          text: 'Ranga',
          value: 'rang'
        },
        {
          text: 'Jednostka',
          value: 'unit'
        },
      ]
    }
  },
  computed: {
    firefighters() {
      return this.$store.getters.getFirefighters
    }
  }
}
</script>

<style scoped>

</style>