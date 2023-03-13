<template>
  <v-row>
    <v-col
        class="work-day-card-col"
        v-for="workDay in workDays"
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
    return {}
  },
  computed: {
    workDays() {
      if (this.$store.getters.getCurrentFirefighter?.role === "ROLE_ADMIN")
        return this.$store.getters.getSchedule?.workDays
      else if (this.$store.getters.getCurrentFirefighter?.role === "ROLE_COMMANDER")
        return this.$store.getters.getSchedule?.workDays.filter(w => w.shift.id === this.$store.getters.getCurrentFirefighter?.shift?.id)
      else if (this.$store.getters.getCurrentFirefighter?.role === "ROLE_FIREFIGHTER")
        return this.$store.getters.getSchedule?.workDays.filter(workDay => workDay.firefighters.some(firefighter => firefighter.id === this.$store.getters.getCurrentFirefighter?.id));
      else return null;
    }
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