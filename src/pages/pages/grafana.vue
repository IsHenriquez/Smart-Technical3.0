<script setup>
import panelesGrafana from "@/views/apps/panelesGrafana.vue"


</script>


<template>
  <v-container fluid>
  <v-layout>
<h2>
  Paneles configurados actualmente
</h2>

    <panelesGrafana />

    <v-main/>
  </v-layout>
</v-container>
</template>

<style>
h2 {
  writing-mode: vertical-lr;
  text-align: center;
}
.down {
  padding-top: 10px;
}
</style>
