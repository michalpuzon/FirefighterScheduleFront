<template>
  <v-app>
    <v-app-bar
      app
      color="grey"
      dark
    >
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
  mounted() {
    this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
  }
};
</script>
