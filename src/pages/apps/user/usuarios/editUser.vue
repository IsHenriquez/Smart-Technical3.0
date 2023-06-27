<template>

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

</template>


<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
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

    const isModalOpen3 = ref(false);

    const openModal3 = (user) => {
      selectedUser.value = user;
      nombre.value = user.name;
      apellido.value = user.last_name;
      email.value = user.email;
      phone.value = user.phone;
      isModalOpen3.value = true;
    };

    const closeModal = () => {
      isModalOpen3.value = false;
    };

    //funcion put al modal usuario
    const enviarUsuario = async () => {
      const datosFormulario = {
        name: nombre.value,
        last_name: apellido.value,
        email: email.value,
        phone: phone.value,
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
      user,
      users,
      selectedUser,
      isLoading,
      isModalOpen3,
      enviarUsuario,
      openModal3,
      closeModal,
    };
  },
}
</script>
