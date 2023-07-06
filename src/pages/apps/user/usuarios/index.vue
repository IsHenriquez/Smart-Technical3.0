<template>
  <div>
    <addUser />

    <v-table>
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th class="columna">ID</th>
          <th class="columna">Nombre</th>
          <th class="columna">Apellido</th>
          <th class="columna">Email</th>
          <th class="columna">Phone</th>
          <th class="columna">Rol</th>
          <th class="columna">Identificación</th>
          <th class="columna-chica">Acciones</th>
        </tr>
      </thead>

      <!-- Cuerpo de la tabla -->
      <tbody>
        <template v-if="isLoading">
          <tr>
            <td colspan="6">Cargando usuarios...</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ formatNumber(user.id_user_type, rolMap) }}</td>
            <td>{{ user.identification_number }}</td>
            <td>
              <VBtn density="compact" icon="mdi-eye" @click="openModal2(user)" />
              <VBtn density="compact" icon="mdi-pencil" @click="openModal3(user)" />
              <VBtn density="compact" icon="mdi-delete" @click="openModal(user.id)" />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>

    <!-- Modal de confirmación para eliminar usuario -->
    <VDialog v-model="isModalOpen" @click:outside="closeModal">
      <VCard class="confirmation2">
        <VCardTitle>Confirmación</VCardTitle>
        <VCardText>
          ¿Seguro que desea eliminar este usuario?
        </VCardText>

        <VCardActions>
          <VBtn @click="eliminarUsuario">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal para ver usuario -->
    <VDialog v-model="isModalOpen2" @click:outside="closeModal">
      <VCard class="confirmation3">
        <VCardTitle style="text-align: center;">Detalle del Usuario</VCardTitle>
        <VCardText>
          <v-table>
            <tbody>
              <tr class="tableUser">
                <th scope="row">ID</th>
                <td>{{ ": " + selectedUser.id }}</td>
              </tr>
              <tr>
                <th scope="row">Nombre</th>
                <td>{{ ": " + selectedUser.name }}</td>
              </tr>
              <tr>
                <th scope="row">Apellido</th>
                <td>{{ ": " + selectedUser.last_name }}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{{ ": " + selectedUser.email }}</td>
              </tr>
              <tr>
                <th scope="row">Rol</th>
                <td>{{ ": " + formatNumber(selectedUser.id_user_type, rolMap) }}</td>
              </tr>
              <tr>
                <th scope="row">Rut</th>
                <td>{{ ": " + (selectedUser.identification_number !== null ? selectedUser.identification_number : '') }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </VCardText>
        <VCardActions>
          <VBtn @click="closeModal" style="transform: translateX(590%);">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Modal para editar usuario -->
    <VDialog v-model="isModalOpen3" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Editar Usuario</VCardTitle>
        <VCardText>
          <VForm ref="refForm">
            <VRow>
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Nombre" v-model="nombre" />
              </VCol>
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Apellido" v-model="apellido" />
              </VCol>
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Email" v-model="email" />
              </VCol>
              <VCol cols="12" md="12" class="editform">
                <AppTextField label="Phone" v-model="phone" />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardActions>
          <VBtn @click="enviarUsuario">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <v-alert v-if="alerta.text" closable :text="alerta.text" variant="tonal" type="success"></v-alert>

  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import addUser from './addUser.vue';

export default {
  name: 'App',
  components: {
    addUser,
  },
  setup() {
    const users = ref([]);
    const user = ref(null);
    const isLoading = ref(false);
    const selectedUser = ref(null);
    const nombre = ref("");
    const apellido = ref("");
    const email = ref("");
    const phone = ref("");
    const alerta = ref({ text: '' });

    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);
    const isModalOpen3 = ref(false);

    const openModal = (userId) => {
      selectedUser.value = users.value.find((user) => user.id === userId);
      isModalOpen.value = true;
    };

    const openModal2 = (user) => {
      selectedUser.value = user;
      isModalOpen2.value = true;
    };

    const openModal3 = (user) => {
      selectedUser.value = user;
      nombre.value = user.name;
      apellido.value = user.last_name;
      email.value = user.email;
      phone.value = user.phone;
      isModalOpen3.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      isModalOpen2.value = false;
      isModalOpen3.value = false;
    };

    // Función GET para listar los usuarios en la tabla
    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('http://54.161.75.90/api/user');
        users.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });

    // Función delete para eliminar usuario
    const eliminarUsuario = async () => {
      try {
        if (selectedUser.value !== null && selectedUser.value.id) {
          const userId = selectedUser.value.id;

          // Se hace la solicitud DELETE al servidor
          await axios.delete(`http://54.161.75.90/api/user/${userId}`);
          
          // Actualiza la lista de usuarios después de eliminar
          const getUsersResponse = await axios.get('http://54.161.75.90/api/user');
          users.value = getUsersResponse.data.data;
          alerta.value = { text: 'Usuario eliminado correctamente', variant: 'success' };
          console.log('Usuario eliminado correctamente');
        }
      } catch (error) {
        alerta.value = { text: 'Error al eliminar el usuario', variant: 'error' };
        console.error(error);
      }
      closeModal();
    };

    //funcion put al modal usuario
    const enviarUsuario = async () => {
      const datosFormulario = {
        name: nombre.value,
        last_name: apellido.value,
        email: email.value,
        phone: phone.value,
        identification_number: selectedUser.value.identification_number,
        active: selectedUser.value.active,
        id_user_type: selectedUser.value.id_user_type
      };

      axios.put(`http://54.161.75.90/api/user/${selectedUser.value.id}`, datosFormulario)
        .then(response => {
          location.reload();
          alerta.value = { text: 'Se Actualizo con éxito', variant: 'success' };
          console.log('La solicitud PUT se realizó con éxito');
          console.log('Respuesta:', response.data);
        })
        .catch(error => {
          console.error('Error al realizar la solicitud PUT:', error);
        });
      closeModal();
    }

    
    return {
      nombre,
      apellido,
      email,
      phone,
      user,
      users,
      selectedUser,
      isLoading,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      alerta,
      eliminarUsuario,
      enviarUsuario,
      openModal,
      closeModal,
      openModal2,
      openModal3,
    };
  },
  data() {
    return {
      isPanelOpen: false,
      campo1: '',
      rolMap: {
        1: 'Admin',
        2: 'Secretario',
        3: 'Tecnico',
      },
    };
  },
  methods: {
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
    },
    formatNumber(value, numberMap) {
      if (numberMap.hasOwnProperty(value)) {
        return numberMap[value];
      }
      return value;
    },
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

.panel {
  padding: 20px;
  background-color: #f5f5f5;
  max-inline-size: 300px;
}

.tableUser {
  inline-size: 30%;
}
</style>
