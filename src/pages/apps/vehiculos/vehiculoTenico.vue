<template>
  <div>
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
            </td>
          </tr>

          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>

    <!--Modal de boton ver usuario-->
    <VDialog v-model="isModalOpen2" @click:outside="closeModal">
      <VCard class="confirmation">
        <VCardTitle>Detalle del Usuario</VCardTitle>
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

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const mostrarModal = ref(false)
    const isModalOpen2 = ref(false)

    const closeModal = () => {
      isModalOpen2.value = false
    }
    const openModal2 = () => {
      isModalOpen2.value = true
    }

    return {
      mostrarModal,
      isModalOpen2,
      openModal2,
      closeModal,
    }
  },
}
</script>

<style>
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
</style>
