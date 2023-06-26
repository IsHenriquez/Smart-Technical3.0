<template>
  <div>
    
    <div class="map-container">
      <div class="map-wrapper">
        <GoogleMap
          api-key="AIzaSyBBI-D26YoQUTnXBNGrqQU0pAagnh0V1hw"
          style="width: 100%; height: 500px"
          :center="center"
          :zoom="15"
        >
          <Marker v-for="marker in markers" :key="marker.id" :options="marker.options" />
        </GoogleMap>
      </div>
    </div>
    <v-table height="200px">
      <thead>
        <tr>
          <th>Identificador</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">
          <tr>
            <td colspan="4">Cargando usuarios...</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id_user }}</td>
            <td>
              <template v-if="userNames[user.id_user]">
                {{ userNames[user.id_user] }}
              </template>
              <template v-else>
                Cargando nombre...
              </template>
            </td>
            <td>{{ formatDate(user.updated_at) }}</td>
            <td>
              <template v-if="user.address">
                {{ user.address }}
              </template>
              <template v-else>
                Cargando dirección...
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import axios from "axios";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const mostrarModal = ref(false);
    const isLoading = ref(false);
    const center = { lat: -33.45694, lng: -70.64827 };
    const markers = ref([]);
    const users = ref([]);
    const userNames = ref({});

    async function reverseGeocode(latitude, longitude) {
      const geocoder = new google.maps.Geocoder();
      const location = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
      return new Promise((resolve, reject) => {
        geocoder.geocode({ location: location }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
            resolve(results[0].formatted_address);
          } else {
            reject(status);
          }
        });
      });
    }

    async function fetchUserName(userId) {
      try {
        const response = await axios.get(`http://54.161.75.90/api/user/${userId}`);
        const user = response.data.data;
        return `${user.name} ${user.last_name}`;
      } catch (error) {
        console.error(error);
        return "";
      }
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds} ${day}/${month}/${year} `;
    }

    async function submitForm() {
      // Realiza las acciones necesarias al enviar el formulario
      // ...

      // Cierra el modal
      mostrarModal.value = false;

      // Reinicia el formulario
      

      window.location.reload();
    }

    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get("http://54.161.75.90/api/position");
        users.value = response.data.data;

        for (const user of users.value) {
          const userName = await fetchUserName(user.id_user);
          userNames.value[user.id_user] = userName;
        }

        for (const user of users.value) {
          try {
            const address = await reverseGeocode(user.latitude, user.longitude);
            user.address = address;
          } catch (status) {
            console.error("Conversión de coordenadas a dirección fallida. Estado:", status);
            user.address = "";
          }
        }

        const markerData = users.value.map((user) => ({
          id: user.id,
          options: {
            position: { lat: user.latitude, lng: user.longitude },
            title: "marcador",
            label: user.id_user.toString(),
          },
        }));

        markers.value = markerData;
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });

    return {
      center,
      markers,
      users,
      userNames,
      formatDate,
      mostrarModal,
      submitForm,
    };
  },
});
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 400px;
}

.map-container {
  display: flex;
}

.map-wrapper {
  width: 100%;
  height: 500px;
}

table {
  width: 20%;
  margin-left: 20px;
}
</style>
