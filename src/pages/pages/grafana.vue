<template>

  <v-card>
    <h1 style="text-align: center;">Monitoreo en tiempo real Grafana</h1>
  </v-card>
    <v-card class="cardPanel iframe-container">
      
      <iframe class="responsive-iframe" src="http://35.203.149.123:3000/d/sF7d-FHZz/smartki-monitoring?orgId=1&from=1687884934301&to=1687886734301"></iframe>
    </v-card>

  <br>
</template>

<style>
.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* Aspect ratio 16:9 */
  overflow: hidden;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
