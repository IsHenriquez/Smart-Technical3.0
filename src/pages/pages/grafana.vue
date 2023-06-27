
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
  <div>
    <VCard class="cardPanel">
      <h1 style="text-align: center;">Monitoreo en tiempo real Grafana</h1>
      <iframe src="http://35.203.149.123:3000/d/sF7d-FHZz/smartki-monitoring?orgId=1&from=1687884934301&to=1687886734301"
        style="width: 1000px;  height: 650px;"></iframe>
    </VCard>
  </div>
  <br>

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
</template>


<style>
.down {
  padding-block-start: 10px;
}

.textTitleCard {
  padding-inline-start: 10px;
}

.cardPanel {
  inline-size: 1020px;
  padding-block-start: 10px;
  padding-inline-start: 10px;
  transform: translateX(10%);
}
</style>
