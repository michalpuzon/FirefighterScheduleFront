<template>
<v-card class="work-day-card scroll-x-reverse-transition">
  <v-card-title>
    {{workDay.date}}
  </v-card-title>
  <div class="justify-center">
  <h4>Strażacy</h4>
  <li v-for="firefighter in workDay.firefighters" :key="firefighter.id">{{firefighter.name}} {{firefighter.lastName}} - {{firefighter.workNumber}}</li>
  </div>
  <v-card-text>Zmiana: {{workDay.shiftId}}</v-card-text>
</v-card>
</template>

<script>
export default {
  name: "WorkDayCard",
  props: ['workDay'],
  mounted() {
    console.log(this.workDay)
  }
}
</script>

<style scoped>

.work-day-card {
  width: 100%;
  height: 100%;
}

</style>