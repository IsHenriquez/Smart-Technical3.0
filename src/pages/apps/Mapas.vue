<template>
  <div class="map-container">
    <div class="map-wrapper">
      <GoogleMap
        api-key="AIzaSyBBI-D26YoQUTnXBNGrqQU0pAagnh0V1hw"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="15"
      >
        <Marker :options="markerOptions" />
        <Marker :options="markerOptionss" />
      </GoogleMap>
    </div>
    <table>
      <tr>
        <th>Columna 1</th>
        <th>Columna 2</th>
        
      </tr>
      <tr>
        <td>Dato 1</td>
        <td>Dato 2</td>

      </tr>
      <tr>
        <td>Dato 4</td>
        <td>Dato 5</td>

      </tr>
    </table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: -33.45694, lng: -70.64827 };
    const markerOptions = {
      position: { lat: -33.45555287904146, lng: -70.64485942725804 },
      label: "s",
      title: "LADY LIBERTY",
    };
    const markerOptionss = {
      position: { lat: -33.449394224322575, lng: -70.65146839016886 },
      label: "t",
      title: "LADY LIBERTY",
    };

    return { center, markerOptions, markerOptionss };
  },
});
</script>

<style>
.map-container {
  display: flex;
}

.map-wrapper {
  width: 80%;
  height: 500px;
}

table {
  width: 20%;
  margin-left: 20px;
}
</style>
