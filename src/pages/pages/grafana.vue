
<script setup>
import columna from "@/views/apps/grafana/columna.vue"
import panel1 from "@/views/apps/grafana/panel1.vue"
import panel2 from "@/views/apps/grafana/panel2.vue"
import panel3 from "@/views/apps/grafana/panel3.vue"
import panel4 from "@/views/apps/grafana/panel4.vue"
import panel5 from "@/views/apps/grafana/panel5.vue"
import panel6 from "@/views/apps/grafana/panel6.vue"



</script>

<template>
  <VRow class="match-height">

    <VCol cols="12" md="6" sm="6">
      <panel1 />
    </VCol>

    <VCol cols="12" md="6" sm="6">
      <panel2 />
    </VCol>


    <VCol cols="12" md="6" sm="6">
      <panel3 />
    </VCol>


    <VCol cols="12" md="6" sm="6">
      <panel4 />
    </VCol>

    <VCol cols="12" md="6" sm="6">
      <panel5 />
    </VCol>

    <VCol cols="12" md="6" sm="6">
      <panel6 />
    </VCol>

    <VCol cols="20" md="20" sm="12">
      <columna />
    </VCol>
  </VRow>

  <iframe src="  http://35.203.149.123:3000/login" frameborder="0" style="width: 600px; height: 600px;"></iframe>
</template>


<style>
.down {
  padding-block-start: 10px;
}

.textTitleCard {
  padding-inline-start: 10px;
}
</style>
