<template>
  <!--Modal de boton editar usuario-->
  <VDialog v-model="isModalOpen3" @click:outside="closeModal">
    <VCard class="confirmation">
      <VCardTitle>Editar Usuario</VCardTitle>
      <VCardText>
        <VForm ref="refForm">
          <VRow>
            <!-- 👉 Title -->
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
        <VBtn @click="confirmEditUser">Confirmar</VBtn>
        <VBtn @click="closeModal">Cerrar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
import axios from 'axios';

export default {
  setup() {
    const nombre = ref('');
    const apellido = ref('');
    const email = ref('');
    const phone = ref('');

    const openModal3 = (user) => {
      selectedUser.value = user;
      nombre.value = user.name;
      apellido.value = user.last_name;
      email.value = user.email;
      phone.value = user.phone;
      isModalOpen3.value = true;
    };

    const confirmEditUser = async () => {
      try {
        if (selectedUser.value !== null && selectedUser.value.id) {
          const userId = selectedUser.value.id;

          const updatedUser = {
            name: nombre.value,
            last_name: apellido.value,
            email: email.value,
            phone: phone.value,
          };

          // Se hace la solicitud put para actualizar los datos del usuario
          await axios.put(`http://54.161.75.90/api/user/${userId}`, updatedUser);

          // Actualiza la lista de usuarios después de editar
          const getUsersResponse = await axios.get('http://54.161.75.90/api/user');
          users.value = getUsersResponse.data.data;
          console.log('Usuario editado correctamente');
        }
      } catch (error) {
        console.error(error);
      }
      closeModal();
    };

    return {
      nombre,
      apellido,
      email,
      phone,
      confirmEditUser,
      user,
      users,
      selectedUser,
      isLoading,
      isModalOpen,
      openModal,
      closeModal,
    };
  },
};
</script>
