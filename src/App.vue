<template>
  <v-app>
    <v-app-bar
        app
        color="grey"
        dark
    >
      <create-firefighter-dialog/>
      <create-position-dialog/>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import CreateFirefighterDialog from "@/components/CreateFirefighterDialog";
import CreatePositionDialog from "@/components/CreatePositionDialog";

export default {
  name: 'App',

  components: {
    CreatePositionDialog,
    CreateFirefighterDialog
  },

  data: () => ({}),
  mounted() {
    this.$store.dispatch("fetchFirefighters").catch((error) => alert(error.response.data))
  }
};
</script>
