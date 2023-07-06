<template>
  <div>
  <VBtn prepend-icon="tabler-plus" @click="mostrarModal = true">
    Agregar Ticket
  </VBtn>
</div>
<br>
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
                <VCol cols="12" md="12">
                  <AppTextField label="Titulo" v-model="titulo" ref="titleField" />
                </VCol>
                <VCol cols="12" md="12">
                  <AppSelect label="Prioridad" :items="desplegableItems" :item-title="item => item.label"
                    v-model="prioridad" ref="priorityField" >
                    <template #selection="{ item }">
                      <div class="align-center">
                        <VBadge :color="item.raw.color" inline dot class="pa-1 pb-2" />
                        <span>{{ item.raw.label }}</span>
                      </div>
                    </template>
                  </AppSelect>
                </VCol>
                <VCol cols="12" md="12">
                  
                  <label for="datepicker">Fecha realizar servicio</label>
                  
                    <VueDatePicker v-model="date" :enable-time-picker="false" class="custom-datepicker" model-type="yyyy-MM-dd"></VueDatePicker>
                </VCol>
                <VCol cols="12" md="12">
                  <AppSelect label="Tipo Ticket" :items="desplegable" :item-title="item => item.label"
                    v-model="type" ref="typeField" >
                    <template #selection="{ item }">
                      <div class="align-center">
                        <VBadge :color="item.raw.color" inline dot class="pa-1 pb-2" />
                        <span>{{ item.raw.label }}</span>
                      </div>
                    </template>
                  </AppSelect>
                </VCol>
                <VCol cols="12" md="12">
                  <label for="v-combobox">Asignar a:</label>
                  <v-combobox
                      v-model="asigned"
                      :items="names"
                      label="Seleccionar agente"
                      item-text="name"
                      item-value="id"
                      variant="outlined"
                      
                    ></v-combobox>
                </VCol>
                
                

                <!-- 👉 Description -->
                <VCol cols="12">
                  <AppTextarea label="Descripción (opcional)" v-model="descripcion" ref="descriptionField" />
                </VCol>

                <!-- 👉 Form buttons -->
                <VCol cols="12">
                  <VBtn class="me-3" @click="agregarTicket" >Submit</VBtn>
                  <VBtn variant="tonal" color="secondary" @click=cerrarModalAdd>Cancel</VBtn>
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

    const date = ref(new Date());

    axios.get('http://54.161.75.90/api/user').then(response => {
      users.value = response.data.data;
      
      names.value = users.value.map(user => user.name);

      
    });

    const names = ref([]);
    const users = ref([]);


    const mostrarModal = ref(false);
    const geticket = ref([]);
    const isLoading = ref(false);
    const selectedTicket = ref({});

    const desplegableItems = ref([
      { id: 1, label: 'Alta' },
      { id: 2, label: 'Media' },
      { id: 3, label: 'Baja' },
    ]);
    const desplegable = ref([
      { id: 1, label: 'Tickets' },
      { id: 2, label: 'Cita' },
    ]);

    return {
      mostrarModal,
      geticket,
      isLoading,
      selectedTicket,
      desplegableItems,
      desplegable,
      names,
      date
    };

  },
  data() {
    return {
      

      titulo: '',
      prioridad: '',
      type: '',
      asigned: '',
      descripcion: '',
   
    };
  },
  methods: {
    
    async cerrarModalAdd() {
      this.mostrarModal = false
      this.titulo = ''
      this.prioridad= ''
      this.type= ''
      this.asigned= ''
      this.descripcion= ''
      this.date = ''
      this.formValid = false;

    },

    agregarTicket() {
  if (this.$refs.refForm.validate()) {
    var priority;

    if (this.prioridad === "Alta") {
      priority = 3;
    } else if (this.prioridad === "Media") {
      priority = 2;
    } else if (this.prioridad === "Baja") {
      priority = 1;
    }

    var ticket_type;

    if (this.type === "Cita") {
      ticket_type = 2;
    } else if (this.type === "Tickets") {
      ticket_type = 1;
    }

    var descripcionDefault

    if (this.descripcion.length === 0){
      descripcionDefault = "descripcion default"
    } else {
      descripcionDefault = this.descripcion
    }



    axios.get(`http://54.161.75.90/api/user?filter=[{"operator":"=","value":"${this.asigned}","property":"name"}]`).then(response => {
      const idTemp = response.data.data[0].id;
      

      const user_id_actual = idTemp;

      const formData = {
        fecha_realizar_servicio: this.date,
        id_priority: priority,
        description: descripcionDefault,
        id_category: 1,
        id_type: ticket_type,
        id_status: 2,
        id_managing_user: user_id_actual,
        title: this.titulo
      };


      console.log(formData)
      axios.post('http://54.161.75.90/api/ticket', formData).then(response => {
        console.log("respuesta", response.data);

        this.mostrarModal = false;
        location.reload();
      })
    });
  }


}

  }
 
  
}
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
  inline-size: 450px;
  transform: translateX(-37%);
}

.modal-right {
  margin-inline-start: 20%;
}

.columna {
  inline-size: 14%;
}

.columna-id {
  font-size: 10px;
  padding-block: -5%;
  padding-inline: -10px;
  transform: translateX(-4%);
}

.v-btn--dense {
  font-size: 12px;
  padding-block: 1px;
  padding-inline: 8px;
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

.confirmation3 {
  block-size: 420px;
  inline-size: 500px;
  inset-block-start: 50%;
  margin-inline: auto;
  transform: translateY(-29%);
  transform: translateX(2%);
}

.confirmation2 {
  align-items: center;
  block-size: 170px;
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
