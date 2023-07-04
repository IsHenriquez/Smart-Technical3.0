<template>
  <addTicket />
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
        <tr v-for="ticket in filteredTickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ formatNumber(ticket.id_status, statusMap) }}</td>
          <td>{{ formatNumber(ticket.id_priority, priorityMap) }}</td>
          <td>{{ formatNumber(ticket.id_type, typeMap) }}</td>
          <td>{{ formatNumber(ticket.id_category, categoryMap) }}</td>
          <td>{{ ticket.fecha_realizar_servicio }}</td>
          <td>
            <VBtn density="compact" icon="mdi-eye" @click="openModal2(ticket)" />
            <VBtn density="compact" icon="mdi-pencil" @click="openModal3(ticket)" />
            <VBtn density="compact" icon="mdi-delete" @click="openModal(ticket.id)" />
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
        <VBtn @click="eliminarTicket">Confirmar</VBtn>
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
              <td>{{ ": " + (selectedTicket.fechaticket !== null ? selectedTicket.fechaticket : "") }}</td>
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
              <AppTextField label="Title" v-model="titulo" />
            </VCol>
            <VCol cols="12" md="12">
              <AppSelect label="Estado" :items="desplegableItems1" :item-title="item => item.label" v-model="estado" />
            </VCol>
            <VCol cols="12" md="12">
              <AppSelect label="Prioridad" :items="desplegableItems" :item-title="item => item.label"
                v-model="prioridad" />
            </VCol>
            <VCol cols="12" md="12">
              <AppSelect label="Tipo Ticket" :items="desplegable" :item-title="item => item.label" v-model="tipoTicket" />
            </VCol>
            <VCol cols="12" md="12">
              <label for="datepicker">Fecha realizar servicio</label>
              <VueDatePicker v-model="fechaServicio" :enable-time-picker="false" class="custom-datepicker"
                model-type="yyyy-MM-dd">
              </VueDatePicker>
            </VCol>
            <VCol cols="12">
              <AppTextarea label="Descripción" v-model="descripcion" />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn @click="enviarTicket">Confirmar</VBtn>
        <VBtn @click="closeModal">Cerrar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <v-alert v-if="alerta.text" closable :text="alerta.text" variant="tonal" type="success"></v-alert>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import addTicket from './addTicket.vue';

export default {
  name: 'App',
  components: {
    addTicket,
  },
  setup() {
    const geticket = ref([]);
    const isLoading = ref(false);
    const selectedTicket = ref({});
    const titulo = ref("");
    const estado = ref("");
    const prioridad = ref("");
    const tipoTicket = ref("");
    const descripcion = ref("");
    const fechaServicio = ref("");
    const alerta = ref({ text: '' });

    const desplegableItems = ref([
      { id: 1, label: 'Alta' },
      { id: 2, label: 'Media' },
      { id: 3, label: 'Baja' },
    ]);
    const desplegableItems1 = ref([
      { id: 1, label: 'Cerrado' },
      { id: 2, label: 'Abierto' },
    ]);
    const desplegable = ref([
      { id: 1, label: 'Tickets' },
      { id: 2, label: 'Cita' },
    ]);

    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);
    const isModalOpen3 = ref(false);

    const openModal = (ticketId) => {
      selectedTicket.value = geticket.value.find((ticket) => ticket.id === ticketId);
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


    const openModal3 = (ticket) => {
      selectedTicket.value = ticket;
      titulo.value = ticket.title;
      estado.value = ticket.id_status;
      prioridad.value = ticket.id_priority;
      tipoTicket.value = ticket.id_type;
      fechaServicio.value = ticket.fecha_realizar_servicio;
      descripcion.value = ticket.description;
      isModalOpen3.value = true;
    };
    const closeModal = () => {
      isModalOpen.value = false;
      isModalOpen2.value = false;
      isModalOpen3.value = false;
    };

    const filteredTickets = computed(() => {
      return geticket.value.filter((ticket) => ticket.id_category === 1);
    });

    //funcion get para listar los usuarios en la tabla
    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('http://54.161.75.90/api/ticket');
        geticket.value = response.data.data;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });

    //funcion delete para eliminar tickets
    const eliminarTicket = async () => {
      try {
        if (selectedTicket.value !== null && selectedTicket.value.id) {
          const ticketId = selectedTicket.value.id;

          // solicitud Delete
          await axios.delete(`http://54.161.75.90/api/ticket/${ticketId}`);

          // Actualiza la lista después de eliminar
          const getTicketResponse = await axios.get('http://54.161.75.90/api/ticket');
          geticket.value = getTicketResponse.data.data;

          console.log('Ticket eliminado');
        }
      } catch (error) {
        console.error(error);
      }
      closeModal();
      location.reload();
    }

    //funcion put para actualizar datos del ticket
    const enviarTicket = async () => {
      const datosFormulario = {
        title: titulo.value,
        id_status: estado.value,
        id_type: tipoTicket.value,
        id_priority: prioridad.value,
        fecha_realizar_servicio: fechaServicio.value,
        description: descripcion.value,
        id_category: selectedTicket.value.id_category,
        id_managing_user: selectedTicket.value.id_managing_user
      };

      axios.put(`http://54.161.75.90/api/ticket/${selectedTicket.value.id}`, datosFormulario)
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
      titulo,
      estado,
      prioridad,
      tipoTicket,
      descripcion,
      fechaServicio,
      geticket,
      isLoading,
      selectedTicket,
      desplegableItems,
      desplegableItems1,
      desplegable,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      openModal2,
      openModal3,
      closeModal,
      enviarTicket,
      filteredTickets,
      eliminarTicket,
      alerta,
    };

  },
  data() {
    return {
      statusMap: {
        1: 'Pendiente',
        2: 'Abierto',
        3: 'Cerrado',
      },
      priorityMap: {
        3: 'Urgente',
        2: 'Media',
        1: 'Baja'
      },
      typeMap: {
        1: 'Tickets',
        2: 'Citas',
      },
      categoryMap: {
        1: 'Trabajo',
        2: 'Personal',
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
