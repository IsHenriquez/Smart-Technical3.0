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
                    <AppTextField label="Titulo" v-model="selectedTicket.title" ref="titleField" />
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppSelect label="Prioridad" :items="desplegableItems" :item-title="item => item.label"
                      v-model="selectedTicket.priorityticket" ref="priorityField">
                      <template #selection="{ item }">
                        <div class="align-center">
                          <VBadge :color="item.raw.color" inline dot class="pa-1 pb-2" />
                          <span>{{ item.raw.label }}</span>
                        </div>
                      </template>
                    </AppSelect>
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppSelect label="Tipo Ticket" :items="desplegable" :item-title="item => item.label"
                      v-model="selectedTicket.typeticket" ref="typeField">
                      <template #selection="{ item }">
                        <div class="align-center">
                          <VBadge :color="item.raw.color" inline dot class="pa-1 pb-2" />
                          <span>{{ item.raw.label }}</span>
                        </div>
                      </template>
                    </AppSelect>
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppTextField label="Categoria" v-model="selectedTicket.categoryticket" ref="categoryField" />
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppTextField label="Fecha Ticket" v-model="selectedTicket.fechaticket" ref="dateField" />
                  </VCol>


                  <!-- 👉 Description -->
                  <VCol cols="12">
                    <AppTextarea label="Descripción" v-model="selectedTicket.description" ref="descriptionField" />
                  </VCol>

                  <!-- 👉 Form buttons -->
                  <VCol cols="12">
                    <VBtn type="submit" class="me-3" @click="agregarUsuario">Submit</VBtn>
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

  <v-table class="table">
    <thead>
      <tr>
        <th class="columna-chica">ID</th>
        <th class="columna">Titulo</th>
        <th class="columna">Estado</th>
        <th class="columna">Prioridad</th>
        <th class="columna">Tipo Ticket</th>
        <th class="columna">Categoria</th>
        <th class="columna">Fecha Ticket</th>
        <th class="columna-id">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="isLoading">
        <tr>
          <td colspan="6">Cargando Tickets...</td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="ticket in geticket" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ formatNumber(ticket.id_status, statusMap) }}</td>
          <td>{{ formatNumber(ticket.id_priority, priorityMap) }}</td>
          <td>{{ formatNumber(ticket.id_type, typeMap) }}</td>
          <td>{{ formatNumber(ticket.id_category, categoryMap) }}</td>
          <td>{{ ticket.fecha_realizar_servicio }}</td>
          <td>
            <VBtn density="compact" icon="mdi-eye" @click="openModal2(ticket)" />
            <VBtn density="compact" icon="mdi-pencil" @click="openModal3" />
            <VBtn density="compact" icon="mdi-delete" @click="openModal" />
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>

  <VDialog v-model="isModalOpen" @click:outside="closeModal">
    <VCard class="confirmation2">
      <VCardTitle>Confirmación</VCardTitle>
      <VCardText>
        ¿Seguro que desea eliminar este Ticket?
      </VCardText>

      <VCardActions>
        <VBtn @click="">Confirmar</VBtn>
        <VBtn @click="closeModal">Cerrar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!--Modal de boton ver usuario-->
  <VDialog v-model="isModalOpen2" @click:outside="closeModal">
    <VCard class="confirmation3">
      <VCardTitle style="text-align: center;">Detalle del Ticket</VCardTitle>
      <VCardText>
        <v-table>
          <tbody>
            <tr class="tableUser">
              <th scope="row">ID</th>
              <td>{{ ": " + selectedTicket.id }}</td>
            </tr>
            <tr>
              <th scope="row">Titulo</th>
              <td>{{ ": " + selectedTicket.title }}</td>
            </tr>
            <tr>
              <th scope="row">Estado</th>
              <td>{{ ": " + formatNumber(selectedTicket.statusticket, statusMap) }}</td>
            </tr>
            <tr>
              <th scope="row">Prioridad</th>
              <td>{{ ": " + formatNumber(selectedTicket.priorityticket, priorityMap) }}</td>
            </tr>
            <tr>
              <th scope="row">Tipo Ticket</th>
              <td>{{ ": " + formatNumber(selectedTicket.typeticket, typeMap) }}</td>
            </tr>
            <tr>
              <th scope="row">Categoria</th>
              <td>{{ ": " + formatNumber(selectedTicket.categoryticket, categoryMap) }}</td>
            </tr>
            <tr>
              <th scope="row">Fecha Ticket</th>
              <td>{{ ": " + (selectedTicket.fechaticket !== null ? selectedTicket.fechaticket: "") }}</td>
            </tr>
            <tr>
              <th scope="row">Descripcion</th>
              <td>{{ ": " + selectedTicket.description }}</td>
            </tr>
            <!-- Agrega más filas según los campos de datos que desees mostrar -->
          </tbody>
        </v-table>
      </VCardText>
      <VCardActions>
        <VBtn @click="closeModal" style="transform: translateX(590%);">Cerrar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!--Modal de boton editar usuario-->
  <VDialog v-model="isModalOpen3" @click:outside="closeModal">
    <VCard class="confirmation">
      <VCardTitle>Editar Ticket</VCardTitle>
      <VCardText>
        <VForm ref="refForm">
          <VRow>
            <!-- 👉 Title -->
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Title" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Estado" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Prioridad" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Tipo Ticket" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Fecha Inicio" />
            </VCol>
            <VCol cols="12">
              <AppTextarea label="Descripción" />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn @click="closeModal">Confirmar</VBtn>
        <VBtn @click="closeModal">Cerrar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  setup() {
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
      { id: 1, label: 'Cita' },
      { id: 2, label: 'Tickets' },
    ]);

    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);
    const isModalOpen3 = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const openModal2 = (ticket) => {
      selectedTicket.value.id = ticket.id;
      selectedTicket.value.title = ticket.title;
      selectedTicket.value.statusticket = ticket.id_status;
      selectedTicket.value.priorityticket = ticket.id_priority;
      selectedTicket.value.typeticket = ticket.id_type;
      selectedTicket.value.categoryticket = ticket.id_category;
      selectedTicket.value.fechaticket = ticket.fecha_realizar_servicio;
      selectedTicket.value.description = ticket.description;
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



    //funcion get para listar los usuarios en la tabla
    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('https://smarttechnicalcl.000webhostapp.com/api/ticket');
        geticket.value = response.data.data;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });

    //funcion delete para eliminar tickets

    //funcion put para actualizar datos del ticket


    //funcion post para agregar ticker nuevo

    //funcion post para agregar ticker nuevo
    function agregarUsuario() {
  // Obtener una referencia al formulario utilizando la referencia "refForm"
  const form = this.$refs.refForm;

  // Verificar si el formulario es válido antes de enviar los datos
  if (form && form.validate && form.validate()) {
    // Obtener los valores de los campos del formulario dinámicamente
    const formData = {};
    for (const key in this.selectedTicket) {
      if (this.selectedTicket.hasOwnProperty(key)) {
        formData[key] = this.selectedTicket[key];
      }
    }

    // Crear un objeto con los valores obtenidos
    const data = {
      "success": true,
      "data": [formData]
    };

    // Enviar la solicitud POST con los datos del formulario
    axios.post('https://smarttechnicalcl.000webhostapp.com/api/ticket', data)
      .then(response => {
        console.log(response);
        // Manejar la respuesta de la solicitud POST
      })
      .catch(error => {
        console.error(error);
        // Manejar el error en caso de que ocurra
      });
  }
}


    return {
      mostrarModal,
      geticket,
      isLoading,
      selectedTicket,
      desplegableItems,
      desplegable,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      openModal2,
      openModal3,
      closeModal,
      agregarUsuario,
    };

  },
  data() {
    return {
      statusMap: {
        1: 'Abierto',
        2: 'Cerrado',
      },
      priorityMap: {
        1: 'Urgente',
        2: 'Media',
        3: 'Baja'
      },
      typeMap: {
        1: 'Tickets',
        2: 'Citas',
      },
      categoryMap: {
        1: 'Tickets',
        2: 'Citas',
      }
    };
  },
  methods: {
    formatNumber(value, numberMap) {
      if (numberMap.hasOwnProperty(value)) {
        return numberMap[value];
      }
      return value;
    },
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
