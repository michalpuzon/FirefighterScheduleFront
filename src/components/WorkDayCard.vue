<template>
<v-card class="work-day-card scroll-x-reverse-transition">
  <v-card-title>
    {{workDay.date}}
  </v-card-title>
  <div class="justify-center">
  <h4>Strażacy</h4>
  <li class="firefighter-name" v-for="firefighter in workDay.firefighters" :key="firefighter.id">{{firefighter.name}} {{firefighter.lastName}}</li>
  </div>
  <v-card-text>Zmiana: {{workDay.shiftId}}</v-card-text>
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
  margin-left: 5px;
}

.work-day-card {
  opacity: 0.95;
  width: 100%;
  height: 100%;
}

</style>