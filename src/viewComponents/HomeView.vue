<template>
  <div class="center-card">
    <v-card class="ma-8">
      <v-card-title>Aplikacja tworzenia harmonogramu straży pożarnej</v-card-title>
      <v-card-text>utwórz strażaków oraz pozycję, następnie dodaj odpowiednie pozycję do każdego strażaka i przejdź do
        tworzenia harmonogramu
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "HomeView"
}
</script>

<style scoped>
.v-card {
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.95;
  flex-direction: column;
}

.center-card {
  display: flex;
  justify-content: center;
}

</style>