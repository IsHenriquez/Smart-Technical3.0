<script setup>
import AnalyticsEarningReportsWeeklyOverview from '@/views/dashboards/analytics/AnalyticsEarningReportsWeeklyOverview.vue'
import AnalyticsSalesOverview from '@/views/dashboards/analytics/AnalyticsSalesOverview.vue'
import AnalyticsSupportTracker from '@/views/dashboards/analytics/AnalyticsSupportTracker.vue'
import AnalyticsWebsiteAnalytics from '@/views/dashboards/analytics/AnalyticsWebsiteAnalytics.vue'
import Clima from '@/views/dashboards/clima.vue'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Website analytics -->
    <VCol cols="12" md="6">
      <AnalyticsWebsiteAnalytics />
    </VCol>

    <!-- 👉 Sales Overview -->
    <VCol cols="12" md="3" sm="6">
      <AnalyticsSalesOverview />
    </VCol>



    <!-- 👉 Earning Reports Weekly Overview -->
    <VCol cols="12" md="3">
      <AnalyticsEarningReportsWeeklyOverview />
    </VCol>

    <!-- 👉 Earning Reports Weekly Overview -->
    <VCol cols="12" md="3">
      <Clima />
    </VCol>

    <!-- 👉 Support Tracker -->
    <VCol cols="20" md="20" sm="12">
      <AnalyticsSupportTracker />
    </VCol>
  </VRow>
</template>



<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
