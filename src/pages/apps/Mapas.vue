<template>
  <div class="map-wrap">
    <a
      href="https://www.maptiler.com"
      class="watermark"
    />
    <div
      ref="mapContainer"
      class="map"
    />
  </div>
</template>

<script>
import { Map } from 'maplibre-gl'
import { markRaw, onMounted, onUnmounted, shallowRef } from 'vue'

export default {
  name: "Mapa",
  setup () {
    const mapContainer = shallowRef(null)
    const map = shallowRef(null)
    

    onMounted(() => {
      const apiKey = 'NHyhDHUf15vaw2foSq6C'

      const initialState = { lng: -70.64827, lat: -33.45694, zoom: 12 }

      

      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,

      }))
      
    }),
    onUnmounted(() => {
      map.value?.remove()
    })

    return {
      map, mapContainer,
    }
  },
}
</script>


<style scoped>
@import "node_modules/maplibre-gl/dist/maplibre-gl.css";

.map-wrap {
  position: relative;
  block-size: calc(100vh - 77px); /* calculate height of the screen minus the heading */
  inline-size: 100%;
}

.map {
  position: absolute;
  block-size: 90%;
  inline-size: 90%;
}
</style>
