<template>
  <div>
    <div>
      <VBtn prepend-icon="tabler-plus" @click="mostrarModal = true">
        Agregar Ticket
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
                      <AppTextField label="Título" />
                    </VCol>

                    <!-- 👉 Calendar -->
                    <VCol cols="12">
                      <AppSelect label="Prioridad" :items="desplegableItems" :item-title="item => item.label">
                        <template #selection="{ item }">
                          <div class="align-center">
                            <VBadge :color="item.raw.color" inline dot class="pa-1 pb-2" />
                            <span>{{ item.raw.label }}</span>
                          </div>
                        </template>
                      </AppSelect>
                    </VCol>

                    <!-- 👉 Description -->
                    <VCol cols="12">
                      <AppTextarea label="Descripción" />
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
      <table class="tabla-estilizada">
        <thead>
          <tr>
            <th class="columna-id">ID</th>
            <th class="columna">Publicante</th>
            <th class="columna">Titulo</th>
            <th class="columna">Prioridad</th>
            <th class="columna">Fecha</th>
            <th class="columna acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dato 0</td>
            <td>Dato 1</td>
            <td>Dato 2</td>
            <td>Dato 3</td>
            <td>Dato 4</td>
            <td>
              <VBtn density="compact" icon="mdi-eye" @click="openModal2" />
              <VBtn density="compact" icon="mdi-pencil" @click="openModal3" />
              <VBtn density="compact" icon="mdi-delete" @click="openModal" />
            </td>
          </tr>

          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
    <VDialog v-model="isModalOpen" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Confirmación</VCardTitle>
        <VCardText>
          ¿Seguro que desea eliminar este ticket?
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
        <VCardTitle>Detalle del Ticket</VCardTitle>
        <VCardText>
          <p>ticket de prueba</p>
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
        <VCardTitle>Editar Ticket</VCardTitle>
        <VCardText>
          Ticket...
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

    const desplegableItems = ref([
      { id: 1, label: 'Baja' },
      { id: 2, label: 'Media' },
      { id: 3, label: 'Alta' },
    ])

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


    return {
      mostrarModal,
      desplegableItems,
      isModalOpen,
      isModalOpen2,
      isModalOpen3,
      openModal,
      closeModal,
      openModal2,
      openModal3,
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

.tabla-estilizada {
  border-collapse: collapse;
  inline-size: 100%;
  margin-block-start: 15px;
}

.tabla-estilizada th,
.tabla-estilizada td {
  padding: 8px;
  border: 1px solid black;
  text-align: center;
}

.tabla-estilizada th.columna,
.tabla-estilizada td.columna {
  inline-size: 15%;
}

.columna-id {
  inline-size: 2%;
}

.tabla-estilizada th.acciones,
.tabla-estilizada td.acciones {
  inline-size: 5%;
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
