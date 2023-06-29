<template>
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
                    <AppTextField label="Patente" v-model="Patente"  @input="Patente = $event.target.value.toUpperCase()"/>
                  </VCol>
                  <v-col cols="12" md="12">
                    <label for="marca">Marca:</label>
                    <v-combobox
                      v-model="selectedMarca"
                      :items="marcas"
                      id="marca"
                      label="Seleccionar Marca"
                      variant="outlined"
                    ></v-combobox>
                  </v-col>

                  <v-col cols="12" md="12">
                    <label for="modelo">Modelo:</label>
                    <v-combobox
                      v-model="selectedModelo"
                      :items="modelos"
                      id="modelo"
                      label="Seleccionar Modelo"
                      variant="outlined"
                    ></v-combobox>
                  </v-col>

                  <!-- 👉 Form buttons -->
                  <VCol cols="12">
                    <VBtn class="me-3" @click="agregarVehiculo">Submit</VBtn>
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
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      selectedMarca: null,
      selectedModelo: null,
      marcas: [],
      modelos: [],
      Patente: '',
      mostrarModal: false,
    };
  },
  watch: {
    async selectedMarca(newMarca) {
      try {
        const response1 = await axios.get(`http://54.161.75.90/api/vehicle-brand?filter=[{"operator":"=","value":"${newMarca}","property":"name"}]`);
        const idMarca = response1.data.data[0].id;
        

        const response2 = await axios.get(`http://54.161.75.90/api/vehicle-model?filter=[{"operator":"like","value":"${idMarca}","property":"id_vehicles_brand"}]`);
        
        this.modelos = response2.data.data.map(vehicle => vehicle.name);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get('http://54.161.75.90/api/vehicle-brand');
      this.marcas = response.data.data.map(vehicle => vehicle.name);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async agregarVehiculo  () {

      const nameModel = this.selectedModelo

      const responseModel = await axios.get(`http://54.161.75.90/api/vehicle-model?filter=[{"operator":"=","value":"${nameModel}","property":"name"}]`)
      
      const idModel = responseModel.data.data[0].id;

      const formData = {
        id_vehicle_model: idModel,
        active: 1,
        plate: this.Patente,
        description: "default description"
      }

      axios.post('http://54.161.75.90/api/vehicle', formData).then(response => {
        
        location.reload();
      })

      
    }
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
