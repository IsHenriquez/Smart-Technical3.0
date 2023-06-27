<template>
  <div>
    <div>
      <VBtn prepend-icon="tabler-plus" @click="mostrarModal = true">
        Agregar Vehiculo
      </VBtn>
    </div>
    <Transition name="fade">
      <div v-if="mostrarModal" class="modal-overlay">
        <div class="modal modal-right">
          <!-- Contenido del formulario aquí -->
          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VCard flat>
              <VCardText>
                <!-- SECTION Form -->
                <VForm ref="refForm">
                  <VRow>
                    <!-- 👉 Title -->
                    <VCol cols="12">
                      <AppTextField label="Patente" />
                    </VCol>
                    <VCol cols="12">
                      <AppTextField label="Marca" />
                    </VCol>
                    <VCol cols="12">
                      <AppTextField label="Modelo" />
                    </VCol>

                    <!-- 👉 Form buttons -->
                    <VCol cols="12">
                      <VBtn type="submit" class="me-3">Submit</VBtn>
                      <VBtn variant="tonal" color="secondary" @click="mostrarModal = false">Cancel</VBtn>
                    </VCol>
                  </VRow>
                </VForm>
                <!-- !SECTION -->
              </VCardText>
            </VCard>
          </PerfectScrollbar>
        </div>
      </div>
    </Transition>

    <div>
      <br>
      <v-table>
        <thead>
          <tr>
            <th class="columna">ID</th>
            <th class="columna">Patente</th>
            <th class="columna">Marca</th>
            <th class="columna">Model</th>
            <th class="columna">Descripcion</th>
            <th class="columna-id">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in getVehicle" :key="vehicle.id">
            <td>{{ vehicle.id }}</td>
            <td>{{ vehicle.plate }}</td>
            <td>{{ vehicle.brandName }}</td>
            <td>{{ vehicle.modelName }}</td>
            <td>{{ vehicle.description }}</td>
            <td>
              <VBtn density="compact" icon="mdi-eye" @click="openModal2" />
              <VBtn v-if="usuarioSecr || usuarioAdmin" density="compact" icon="mdi-pencil" @click="openModal3" />
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

    <!-- Modal de botón ver usuario -->
    <VDialog v-model="isModalOpen2" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Detalle Vehiculos</VCardTitle>
        <VCardText>
          Ver Vehiculos
          <!-- Contenido del modal -->
        </VCardText>
        <VCardActions>
          <VBtn @click="closeModal">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal de botón editar usuario -->
    <VDialog v-model="isModalOpen3" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Editar Vehiculos</VCardTitle>
        <VCardText>
          Vehiculos...
          <!-- Contenido del modal -->
        </VCardText>
        <VCardActions>
          <VBtn @click="closeModal">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const getVehicle = ref([]);
    const mostrarModal = ref(false);
    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);
    const isModalOpen3 = ref(false);
    const isLoading = ref(false);
    const selectedVehicle = ref(null);

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

    const openModal2 = () => {
      isModalOpen2.value = true;
    };

    const openModal3 = () => {
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

    return {
      mostrarModal,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      closeModal,
      openModal2,
      openModal3,
      isLoading,
      eliminarVehiculo,
      selectedVehicle,
      getVehicle,
      usuarioSecr,
      usuarioAdmin,
    };
  },
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
  max-inline-size: 700px;
  transform: translateY(-29%);
  transform: translateX(23%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
