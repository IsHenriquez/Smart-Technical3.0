<template>
  <div>
    <button @click="mostrarModal = true">
      Mostrar formulario
    </button>

    <div
      v-if="mostrarModal"
      class="modal-overlay"
    >
      <div class="modal">
        <!-- Contenido del formulario aquí -->
        <PerfectScrollbar :options="{ wheelPropagation: false }">
          <VCard flat>
            <VCardText>
              <!-- SECTION Form -->
              <VForm ref="refForm">
                <VRow>
                  <!-- 👉 Title -->
                  <VCol cols="12">
                    <AppTextField label="Title" />
                  </VCol>

                  <!-- 👉 Calendar -->
                  <VCol cols="12">
                    <AppSelect
                      label="Label"
                      :item-title="item => item.label"
                      :item-value="item => item.label"
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
                    <AppTextarea label="Description" />
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
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const mostrarModal = ref(false)

    return {
      mostrarModal,
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
</style>
