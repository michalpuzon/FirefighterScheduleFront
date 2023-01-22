<template>
    <v-row>
      <v-col
          class="work-day-card-col"
          v-for="workDay in schedule.workDays"
          :key="workDay.id"
      >
        <work-day-card :work-day="workDay"/>
      </v-col>
    </v-row>



</template>

<script>
import WorkDayCard from "@/components/WorkDayCard";
export default {
  name: "ScheduleView",
  components: {WorkDayCard},
  data() {
    return {
        schedule: {},
    }
  },
  mounted() {
      this.schedule = this.$store.getters.getSchedule
  },
}
</script>

<style scoped>

.work-day-card-col {
  margin: 10px;
  width: 14%;
  max-width: 14%;
  flex-basis: 14%;
}
</style>