<template>
  <addUser/>
  <v-table>
    <thead>
      <tr>
        <th class="columna">ID</th>
        <th class="columna">Nombre</th>
        <th class="columna">Apellido</th>
        <th class="columna">Email</th>
        <th class="columna">Phone</th>
        <th class="columna">Rol</th>
        <th class="columna">Genero</th>
        <th class="columna-chica">Acciones</th>
      </tr>
    </thead>
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
          <td>{{ user.gender }}</td>
          <td>
            <VBtn density="compact" icon="mdi-eye" @click="openModal2(user)" />
            <VBtn density="compact" icon="mdi-pencil" @click="openModal3" />
            <VBtn density="compact" icon="mdi-delete" @click="openModal(user.id)" />
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>

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

  <!--Modal de boton ver usuario-->
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
      <VCardTitle>Editar Usuario</VCardTitle>
      <VCardText>
        <VForm ref="refForm">
          <VRow>
            <!-- 👉 Title -->
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Nombre" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Apellido" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Email" />
            </VCol>
            <VCol cols="12" md="12" class="editform">
              <AppTextField label="Phone" />
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
import addUser from './addUser.vue'

export default {

  name: 'App',
  components: {
    addUser,
    
  },

  setup() {
    const mostrarModal = ref(false);
    const users = ref([]);
    const isLoading = ref(false);
    const selectedUser = ref(null);
    const user = ref(null);
    const nombre = ref("");
    const apellido = ref("");
    const email = ref("");
    const rol = ref("");

    const desplegableItems = ref([
      { id: 1, label: 'Admin' },
      { id: 2, label: 'Secretario' },
      { id: 3, label: 'Tecnico' },
    ]);

    const isModalOpen = ref(false);
    const isModalOpen2 = ref(false);
    const isModalOpen3 = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const openModal2 = (user) => {
      selectedUser.value = user;
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
        const response = await axios.get('http://54.161.75.90/api/user');
        users.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });

    //funcion delete para eliminar usuario
    const eliminarUsuario = async (userId) => {
      try {
        await axios.delete(`http://54.161.75.90/api/user/${userId}`);
        users.value = users.value.filter((user) => user.id !== userId);
      } catch (error) {
        console.error(error);
        // Maneja el error según tus necesidades
      }
    };

    //funcion post para agregar usuario


    const agregarUsuario = async () => {
      const formData = {
        name: nombre.value,
        last_name: apellido.value,
        email: email.value,
        id_user_type: rol.value,
        active: true,
        password: 'admin',
      }

      try {
        console.log('data post:', formData)

        // Realizar la solicitud POST a la API
        await axios.post('http://54.161.75.90/api/user', formData)
        console.log('flag 1')

        if (response.status === 200) {
          // Reiniciar los campos del formulario y actualizar la lista de usuarios
          nombre.value = ''
          apellido.value = ''
          email.value = ''
          rol.value = ''
          console.log('flag 2 get tbl users')
          const getUsersResponse = await axios.get('http://54.161.75.90/api/user')

          console.log('tbl user:', getUsersResponse)
          console.log('data?', getUsersResponse.data.data)
          users.value = getUsersResponse.data.data
        } else {
          console.error('Error al agregar el usuario')
        }

        // Actualizar la lista de usuarios

      } catch (error) {
        console.error(error)

      }
    }

    //funcion put para actualizar datos del usuario

    return {
      nombre,
      apellido,
      email,
      rol,
      user,
      users,
      selectedUser,
      agregarUsuario,
      eliminarUsuario,
      isLoading,
      mostrarModal,
      desplegableItems,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      closeModal,
      openModal2,
      openModal3,
    };
  },
  data() {
    return {
      isPanelOpen: false,
      campo1: ''
    };
  },
  methods: {
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
    }
  },
  data() {
    return {
      rolMap: {
        1: 'Admin',
        2: 'Secretario',
        3: 'Tecnico',
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
