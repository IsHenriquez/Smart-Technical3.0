<template>
  <div>
    <div>
      <VBtn v-if="usuarioAdmin === true" prepend-icon="tabler-plus" @click="mostrarModal = true">
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
            <th class="columna">Modelo</th>
            <th class="columna">Usuario</th>
            <th class="columna-id">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isLoading">
            <tr>
              <td colspan="6">Cargando usuarios...</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>Dato 0</td>
              <td>Dato 1</td>
              <td>Dato 2</td>
              <td>Dato 3</td>
              <td>Dato 4</td>
              <td>
                <VBtn density="compact" icon="mdi-eye" @click="openModal2" />
                <VBtn v-if="usuarioSecr || usuarioAdmin === true" density="compact" icon="mdi-pencil"
                  @click="openModal3" />
                <VBtn v-if="usuarioAdmin === true" density="compact" icon="mdi-delete" @click="openModal" />
              </td>
            </tr>
          </template>


          <!-- Agrega más filas según sea necesario -->
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
          <VBtn @click="closeModal">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!--Modal de boton ver usuario-->
    <VDialog v-model="isModalOpen2" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Detalle Vehiculos</VCardTitle>
        <VCardText>
          ver Vehiculos
          <!-- Contenido del modal -->
        </VCardText>
        <VCardActions>
          <VBtn @click="closeModal">Confirmar</VBtn>
          <VBtn @click="closeModal">Cerrar</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!--Modal de boton editar usuario-->
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
import { ref } from 'vue'

export default {
  setup() {
    const mostrarModal = ref(false)

    const isModalOpen = ref(false)
    const isModalOpen2 = ref(false)
    const isModalOpen3 = ref(false)

    const openModal = () => {
      isModalOpen.value = true
    }
    const openModal2 = () => {
      isModalOpen2.value = true
    }
    const openModal3 = () => {
      isModalOpen3.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false,
        isModalOpen2.value = false,
        isModalOpen3.value = false
    }

    var usuarioSecr = false
    var usuarioTec = false
    var usuarioAdmin = false

    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    const userType = (userData && userData.id_user_type) ? userData.id_user_type : null

    if (userType === 3) {
      usuarioSecr = true
    }

    else if (userType === 2) {
      usuarioTec = true
    }

    else if (userType === 1) {
      usuarioAdmin = true
    }



    return {
      mostrarModal,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      closeModal,
      openModal2,
      openModal3,
      usuarioSecr,
      usuarioTec,
      usuarioAdmin
    }
  },
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
