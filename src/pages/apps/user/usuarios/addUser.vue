<template>
  <div>
    <VBtn prepend-icon="tabler-plus" @click="mostrarModal = true">
      Agregar Usuario
    </VBtn>
  </div>
  <v-expansion-panels>
    <v-expansion-panel :expand="isPanelOpen" @click="togglePanel">
      <template v-slot:header>
        <div class="panel-header">Title</div>
      </template>
      <template v-slot:content>
        <div class="panel-content">
          <input type="text" placeholder="Campo 1" v-model="campo1" />
        </div>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
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
                    <AppTextField label="Nombre" id="nombre" v-model="nombreModal"/>
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppTextField label="Apellido" id="apellido"  v-model="apellidoModal"/>
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppTextField label="Email" id="email"  v-model="emailModal"/>
                  </VCol>
                  <!-- 👉 Calendar -->
                  <VCol cols="12" md="12">
                    <AppSelect label="Rol" :items="desplegableItems" :item-title="item => item.label" id="rol" v-model="opcionRolSeleccionada">
                      <template #selection="{ item }">
                        <div class="align-center">
                          <VBadge :color="item.raw.color" inline dot class="pa-1 pb-2" />
                          <span>{{ item.raw.label }}</span>
                        </div>
                      </template>
                    </AppSelect>
                  </VCol>

                  <!-- 👉 Form buttons -->
                  <VCol cols="12">
                    <VBtn class="me-3" @click="agregarUsuarioModal">Submit</VBtn>
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
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const mostrarModal = ref(false);
    const users = ref([]);
    const isLoading = ref(false);
    const selectedUser = ref(null);
    const user = ref(null);
    const nombre = ref("");
    const apellido = ref("");
    const email = ref("");
    const opcionRolSeleccionada = ref("");

    const desplegableItems = ref([
      { id: 2, label: 'Secretario' },
      { id: 3, label: 'Tecnico' },
    ]);

    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
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

    return {
      nombre,
      apellido,
      email,
      opcionRolSeleccionada,
      user,
      users,
      selectedUser,
      isLoading,
      mostrarModal,
      desplegableItems,
      isModalOpen,
      openModal,
      closeModal,
    };
  },
  data() {
    return {
      isPanelOpen: false,
      campo1: '',
      rolMap: {
        2: 'Secretario',
        3: 'Tecnico',
      },
      nombreModal: '',
      apellidoModal: '',
      emailModal: '',
    };
  },
  methods: {
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
    },
    agregarUsuarioModal() {
      let id_type = null;
      if (this.opcionRolSeleccionada === "Secretario") {
        id_type = 2;
      } else if (this.opcionRolSeleccionada === "Tecnico") {
        id_type = 3;
      }

      const formData = {
        name: this.nombreModal,
        last_name: this.apellidoModal,
        email: this.emailModal,
        id_user_type: id_type,
        active: 1,
        password: 'contrasena',
      };

      axios.post('http://54.161.75.90/api/user', formData)
        .then(r => {
          console.log("respuesta:", r.data);
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
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
