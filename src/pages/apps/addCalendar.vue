<template>
  <div>
    <VBtn prepend-icon="tabler-plus" @click="mostrarModal = true" class="bajarBoton">
      Agregar Cita
    </VBtn>
  </div>
  

  <Transition name="fade">
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal modal-right">
        <!-- Contenido del formulario aquí -->
        <PerfectScrollbar :options="{ wheelPropagation: false }">
          <VCard flat class="agrandarModal">
            <VCardTitle>Agregar cita</VCardTitle>
            <VCardText>
              <!-- SECTION Form -->
              <VForm ref="refForm">
                <VRow class="ajustarContenido">
                  <VCol cols="12" md="12">
            <label for="datepicker">Fecha</label>
            <VueDatePicker v-model="date" :enable-time-picker="false" class="custom-datepicker" model-type="yyyy-MM-dd"></VueDatePicker>
          </VCol>

                  <!-- 👉 Title -->
                  <VCol cols="12" md="12">
                    <AppTextField label="Titulo" id="titulo" v-model="tituloModal" />
                  </VCol>

            

                  <!-- 👉 Form buttons -->
                  <VCol cols="12">
                    <VBtn class="me-3" @click="agregarCita">Submit</VBtn>
                    <VBtn variant="tonal" color="secondary" @click="cerrarModalAdd">Cancel</VBtn>
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
import axios from 'axios';
import { onMounted, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {



  setup() {
    const mostrarModal = ref(false);

    const date = ref(new Date());

    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    const user_id_agregando = (userData && userData.id) ? userData.id : null

   

    return {
      
      mostrarModal,
      date,
      openModal,
      closeModal,
      user_id_agregando
    };
  },
  data() {
    return {
      tituloModal: ''
    };
  },
  methods: {
    
    async cerrarModalAdd() {
      this.mostrarModal = false
      this.tituloModal = ''
      this.date = ''

    },
    agregarCita() {
        console.log(this.date)

        const formData = {
          fecha_realizar_servicio: this.date,
          id_priority: 1,
          description: "descripción por defecto",
          id_category: 2,
          id_type: 2,
          id_status: 2,
          id_managing_user: this.user_id_agregando,
          title: this.tituloModal
        }

        console.log(formData)

        axios.post('http://54.161.75.90/api/ticket', formData).then(response => {
          console.log("respuesta", response.data)

          this.mostrarModal = false
          location.reload();
        })
      }
    
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

.bajarBoton{
  transform: translateY(30%);
}

.ajustarContenido{
  transform: translateY(30%);
}

.agrandarModal{
  block-size: 600px;
}

.custom-datepicker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.custom-datepicker label {
  font-weight: bold;
  margin-bottom: 4px;
}

.modal {
  padding: 20px;
  inline-size: 400px;
  transform: translateX(-37%);
  
}

.modal-right {
  margin-inline-start: 20%;
}

.columna {
  inline-size: 11%;
}

.columna-chica {
  padding-block: -5%;
  padding-inline: -10px;
  transform: translateX(0%);
}

.columna-id {
  inline-size: 11%;
}

.panel-header {
  cursor: pointer;
}

.panel-content {
  padding: 10px;
}

.confirmation {
  align-items: center;
  block-size: 470px;
  inline-size: 350px;
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
</style>
