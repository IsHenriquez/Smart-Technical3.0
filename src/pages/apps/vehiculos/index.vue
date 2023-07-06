<template>
  <div>
    <addVehicle />
    <div>
      <br>
      <v-table>
        <thead>
          <tr>
            <th class="columna">ID</th>
            <th class="columna">Patente</th>
            <th class="columna">Marca</th>
            <th class="columna">Modelo</th>
            <th class="columna">Ocupado</th>
            <th class="columna-id">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in getVehicle" :key="vehicle.id">
            <td>{{ vehicle.id }}</td>
            <td>{{ vehicle.plate }}</td>
            <td>{{ vehicle.brandName }}</td>
            <td>{{ vehicle.modelName }}</td>
            <td>{{ formatNumber(vehicle.is_busy, busyMap) }}</td>
            <td>
              <VBtn density="compact" icon="mdi-eye" @click="openModal2(vehicle)" />
              <VBtn v-if="usuarioSecr || usuarioAdmin" density="compact" icon="mdi-pencil" @click="openModal3(vehicle)" />
              <VBtn v-if="usuarioAdmin" density="compact" icon="mdi-delete" @click="openModal(vehicle.id)" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <VDialog v-model="isModalOpen" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Confirmación</VCardTitle>
        <VCardText>
          ¿Seguro que desea eliminar este Vehiculo?
          <!-- Contenido del modal -->
        </VCardText>

        <VCardActions>
          <VBtn @click="eliminarVehiculo">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal de botón ver vehiculo -->
    <VDialog v-model="isModalOpen2" @click:outside="closeModal">
      <VCard class="confirmation3">
        <VCardTitle style="text-align: center;">Detalle del Vehiculo</VCardTitle>
        <VCardText>
          <v-table>
            <tbody>
              <tr class="tableUser">
                <th scope="row">ID</th>
                <td>{{ ": " + selectedVehicle.id }}</td>
              </tr>
              <tr>
                <th scope="row">Patente</th>
                <td>{{ ": " + selectedVehicle.plate }}</td>
              </tr>
              <tr>
                <th scope="row">Marca</th>
                <td>{{ ": " + selectedVehicle.brandName }}</td>
              </tr>
              <tr>
                <th scope="row">Modelo</th>
                <td>{{ ": " + selectedVehicle.modelName }}</td>
              </tr>
              <tr>
                <th scope="row">Ocupado</th>
                <td>{{ ": " + formatNumber(selectedVehicle.is_busy, busyMap) }}</td>
              </tr>
            </tbody>
          </v-table>
        </VCardText>
        <VCardActions>
          <VBtn @click="closeModal" style="transform: translateX(590%);">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal de botón editar usuario -->
    <VDialog v-model="isModalOpen3" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Editar Vehiculo</VCardTitle>
        <VCardText>
          <VForm ref="refForm">
            <VRow>
              <VCol cols="12" md="12" class="formatForm">
                <AppTextField label="Patente" v-model="patente" @input="patente = $event.target.value.toUpperCase()"/>
              </VCol>
              <!--
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Marca" v-model="marca" />
              </VCol>
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Modelo" v-model="modelo" />
              </VCol>
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Ocupado" v-model="estado" />
              </VCol>
              -->
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>
          <VBtn @click="enviarVehiculo">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import addVehicle from './addVehicle.vue';

export default {
  name: 'App',
  components: {
    addVehicle,
  },
  setup() {
    const getVehicle = ref([]);
    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);
    const isModalOpen3 = ref(false);
    const isLoading = ref(false);
    const selectedVehicle = ref(null);
    const vehicle = ref(null);
    const patente = ref("")
    const marca = ref("")
    const modelo = ref("")
    const estado = ref("")

    const usuarioSecr = ref(false);
    const usuarioAdmin = ref(false);

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userType = userData.id_user_type || null;

    if (userType === 3) {
      usuarioSecr.value = true;
    } else if (userType === 1) {
      usuarioAdmin.value = true;
    }

    const openModal = (vehicleId) => {
      selectedVehicle.value = getVehicle.value.find((vehicle) => vehicle.id === vehicleId);
      isModalOpen.value = true;
    };

    const openModal2 = (vehicle) => {
      selectedVehicle.value = vehicle;
      isModalOpen2.value = true;
    };

    const openModal3 = (vehicle) => {
      selectedVehicle.value = vehicle;
      patente.value = vehicle.plate;
      modelo.value = vehicle.id_vehicle_model;
      marca.value = vehicle.id_vehicles_brand;
      estado.value = vehicle.is_busy;
      isModalOpen3.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      isModalOpen2.value = false;
      isModalOpen3.value = false;
    };

    const eliminarVehiculo = async () => {
      try {
        if (selectedVehicle.value !== null && selectedVehicle.value.id) {
          const vehicleId = selectedVehicle.value.id;

          // solicitud Delete
          await axios.delete(`http://54.161.75.90/api/vehicle/${vehicleId}`);

          // Actualiza la lista después de eliminar
          const getVehiclesResponse = await axios.get('http://54.161.75.90/api/vehicle');
          getVehicle.value = getVehiclesResponse.data.data;

          console.log('Vehiculo eliminado');
        }
      } catch (error) {
        console.error(error);
      }
      closeModal();
      location.reload();
    };

    // Función get para listar los vehiculos en la tabla
    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('http://54.161.75.90/api/vehicle');
        getVehicle.value = response.data.data;

        await Promise.all(
          getVehicle.value.map(async (vehicle) => {
            const vehicleModelId = vehicle.id_vehicle_model;

            const modelResponse = await axios.get(`http://54.161.75.90/api/vehicle-model/${vehicleModelId}`);
            const vehicleModelData = modelResponse.data.data;

            vehicle.modelId = vehicleModelData.id;
            vehicle.brandId = vehicleModelData.id_vehicles_brand;
            vehicle.modelName = vehicleModelData.name;

            const brandResponse = await axios.get(`http://54.161.75.90/api/vehicle-brand/${vehicleModelData.id_vehicles_brand}`);
            const brandData = brandResponse.data.data;

            vehicle.brandName = brandData.name;
          })
        );
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });

    //funcion put para actualizar datos del ticket
    const enviarVehiculo = async () => {
      const datosFormulario = {
        plate: patente.value,
        id_vehicle_model: modelo.value,
        id_vehicles_brand: marca.value,
        is_busy: estado.value,
        description: selectedVehicle.value.description,
        active: selectedVehicle.value.active
      };

      axios.put(`http://54.161.75.90/api/vehicle/${selectedVehicle.value.id}`, datosFormulario)
        .then(response => {
          location.reload();
          console.log('Respuesta:', response.data);
        })
        .catch(error => {
          console.error('Error al realizar la solicitud PUT:', error);
        });
      closeModal();
    }

    return {
      patente,
      marca,
      modelo,
      estado,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      closeModal,
      openModal2,
      openModal3,
      isLoading,
      vehicle,
      enviarVehiculo,
      eliminarVehiculo,
      selectedVehicle,
      getVehicle,
      usuarioSecr,
      usuarioAdmin,
    };
  },
  data() {
    return {
      busyMap: {
        0: 'Libre',
        1: 'Ocupado',
      },
    }
  },
  methods: {
    formatNumber(value, numberMap) {
      if (numberMap.hasOwnProperty(value)) {
        return numberMap[value];
      }
      return value;
    },
  }
};
</script>

<style>
.modal-overlay {
  position: fixed;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 50%);
  inset: 0;
}

.modal {
  padding: 20px;
  inline-size: 300px;
  transform: translateX(-37%);
}

.modal-right {
  margin-inline-start: 20%;
}

.columna-id {
  inline-size: 11%;
}

.confirmation {
  display: flex;
  align-items: center;
  justify-content: center;
  inset-block-start: 50%;
  margin-block: 0;
  margin-inline: auto;
  max-inline-size: 400px;
  block-size: 220px;
  transform: translateY(-29%);
  transform: translateX(23%);
}

.confirmation3 {
  block-size: 420px;
  inline-size: 500px;
  inset-block-start: 50%;
  margin-inline: auto;
  transform: translateY(-29%);
  transform: translateX(2%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.formatForm{
  inline-size: 200px;
}
</style>
