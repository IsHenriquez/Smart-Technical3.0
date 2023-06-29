<template>
  <div class="iframe-container">
    <Vcard class="cardPanel">
      <h1 style="text-align: center;">Monitoreo en tiempo real Grafana</h1>
      <iframe class="responsive-iframe"
        src="http://35.203.149.123:3000/d/sF7d-FHZz/smartki-monitoring?orgId=1&from=1687884934301&to=1687886734301"></iframe>
    </Vcard>
  </div>
  <br>
</template>

<style>
.iframe-container {
  position: relative;
  overflow: hidden;
  inline-size: 100%;
  padding-block-end: 56.25%;
}

.responsive-iframe {
  position: absolute;
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}
</style>
