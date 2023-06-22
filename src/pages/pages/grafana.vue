<script setup>
import panelesGrafana from "@/views/apps/panelesGrafana.vue";


</script>


<template>
  <v-container fluid>
    <v-layout>
      <h2 class="textlateral">
        Paneles configurados actualmente
      </h2>

      <panelesGrafana />

      <v-main />
    </v-layout>
  </v-container>
</template>

<style>
.textlateral {
  text-align: center;
  writing-mode: vertical-lr;
}

.down {
  padding-block-start: 10px;
}
</style>
