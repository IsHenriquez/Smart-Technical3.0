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
                    <AppTextField
                        label="RUT"
                        id="rut"
                        v-model="rut"
                        :error-messages="rutError"
                        @blur="validarRut"
                      />
                  </VCol>
                  <VCol cols="12" md="12">
                    <AppTextField
                        label="Correo Electrónico"
                        v-model="email"
                        :error-messages="emailError"
                        @blur="validateEmail"
                      />
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
    
      nombreModal: '',
      apellidoModal: '',
      email: '',
      emailError: '',
      rut: '',
      rutError: '',
    };
  },
  methods: {
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen;
    },


    validarRut() {
      const rutCompleto = this.rut.trim().replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
        this.rutError = 'RUT inválido';
      } else {
        const tmp = rutCompleto.split('-');
        const digv = tmp[1];
        const rut = tmp[0];
        if (digv === 'K') {
          tmp[1] = 'k';
        }
        if (this.dv(rut) !== digv) {
          this.rutError = 'RUT inválido';
        } else {
          this.rutError = '';
        }
      }
    },
    dv(T) {
      let M = 0;
      let S = 1;
      for (; T; T = Math.floor(T / 10)) {
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      }
      return S ? (S - 1).toString() : 'k';
    },

    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (this.email === '') {
        this.emailError = 'El campo de correo electrónico es obligatorio.';
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Por favor, introduce un correo electrónico válido.';
      } else {
        this.emailError = '';
      }
    },


    agregarUsuarioModal() {
      let id_type = null;
      if (this.opcionRolSeleccionada === "Secretario") {
        id_type = 2;
      } else if (this.opcionRolSeleccionada === "Tecnico") {
        id_type = 3;
      }
      const primeraLetraMayuNombre = this.nombreModal.charAt(0).toUpperCase() + this.nombreModal.slice(1)
      const primeraLetraMayuApellido = this.apellidoModal.charAt(0).toUpperCase() + this.apellidoModal.slice(1)


      const formData = {
        name: primeraLetraMayuNombre,
        last_name: primeraLetraMayuApellido,
        email: this.email,
        identification_number: this.rut,
        id_user_type: id_type,
        active: 1,
        password: primeraLetraMayuNombre + '2023',
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
