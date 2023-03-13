<template>
<v-card color="#E0E0E0" class="work-day-card scroll-x-reverse-transition">
  <v-card-title>
    {{workDay.date}}
  </v-card-title>
  <h4 class="ma-2">Strażacy</h4>
  <li class="firefighter-name" v-for="firefighter in workDay.firefighters" :key="firefighter.id">{{firefighter.name}} {{firefighter.lastName}}</li>
  <h4 class="ma-3">Zmiana: {{workDay.shift.number}}</h4>
</v-card>
</template>

<script>
export default {
  name: "WorkDayCard",
  props: ['workDay'],
}
</script>

<style scoped>

.firefighter-name {
  margin-left: 15px;
}

.work-day-card {
  width: 100%;
  height: 100%;
}

</style>