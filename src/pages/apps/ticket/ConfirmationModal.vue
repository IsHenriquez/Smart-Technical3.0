<template>
  <div>
    <div
      v-if="isModalOpen"
      class="modal"
    >
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="modal-actions">
          <button @click="confirm">
            Confirmar
          </button>
          <button @click="cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ConfirmationModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Confirmación',
    },
    message: {
      type: String,
      default: '¿Estás seguro de que deseas realizar esta acción?',
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const isModalOpen = ref(false)

    const confirm = () => {
      props.onConfirm()
      isModalOpen.value = false
    }

    const cancel = () => {
      props.onCancel()
      isModalOpen.value = false
    }

    return {
      isModalOpen,
      confirm,
      cancel,
    }
  },
}
</script>

<style>
.modal {
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

.modal-content {
  padding: 20px;
  border-radius: 4px;
  background-color: white;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-block-start: 20px;
}

button {
  margin-inline-start: 10px;
}
</style>
