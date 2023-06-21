<template>
  <div>
    <div>
      <VBtn
        
        prepend-icon="tabler-plus"
        @click="mostrarModal = true"
      >
        Agregar ticket
      </VBtn>
    </div>
    <Transition name="fade">
      <div
        v-if="mostrarModal"
        class="modal-overlay"
      >
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
                      <AppSelect
                        label="Prioridad"
                        :items="desplegableItems"
                        :item-title="item => item.label"
                      >
                        <template #selection="{ item }">
                          <div class="align-center">
                            <VBadge
                              :color="item.raw.color"
                              inline
                              dot
                              class="pa-1 pb-2"
                            />
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
                      <VBtn
                        type="submit"
                        class="me-3"
                      >
                        Submit
                      </VBtn>
                      <VBtn
                        variant="tonal"
                        color="secondary"
                        @click="mostrarModal = false"
                      >
                        Cancel
                      </VBtn>
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
            <th class="columna1">
              Publicante
            </th>
            <th class="columna2">
              Título
            </th>
            <th class="columna3">
              Prioridad
            </th>
            <th class="columna4">
              Fecha
            </th>
            <th class="columna5">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dato 1</td>
            <td>Dato 2</td>
            <td>Dato 3</td>
            <td>Dato 4</td>
            <td>
              <VBtn
                density="compact"
                icon="mdi-eye"
              />
              <VBtn
                density="compact"
                icon="mdi-pencil"
              />
              <VBtn
                density="compact"
                icon="mdi-delete"
                @click="openModal"
              />
            </td>
          </tr>
          
        <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
    <VDialog
      v-model="isModalOpen"
      @click:outside="closeModal"
    >
      <VCard class="confirmation">
        <VCardTitle>Confirmación</VCardTitle>
        <VCardText>
          ¿Seguro que desea eliminar este ticket?
          <!-- Contenido del modal -->
        </VCardText>
        
        <VCardActions>
          <VBtn @click="closeModal">
            Confirmar
          </VBtn><VBtn @click="closeModal">
            Cerrar
          </VBtn>
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

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }
    

    return {
      mostrarModal, desplegableItems, isModalOpen,
      openModal,
      closeModal,
    }
  },
  
}
</script>

<style>
.modal-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 50%);
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.modal {
  padding: 20px;
  inline-size: 300px;
}

.modal-right {
  margin-inline-start: 20%;
}

.tabla-estilizada {
  border-collapse: separate;
  border-spacing: 0;
  inline-size: 100%;
  margin-block-start: 15px;
}

.tabla-estilizada th,
.tabla-estilizada td {
  padding: 8px;
  border: 1px solid black;
}

.columna5 {
  inline-size: 10px;
}

.confirmation {
  display: flex;
  align-items: center;
  justify-content: center;
  inset-block-start: 50%; /* Centrar verticalmente */
  margin-block: 0;
  margin-inline: auto; /* Centrar horizontalmente */
  max-inline-size: 600px; /* Ancho máximo del modal */
  transform: translateY(-50%);
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
