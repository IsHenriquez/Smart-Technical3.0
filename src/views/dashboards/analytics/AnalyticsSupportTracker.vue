<template>
  <VCard>
    <VCardItem class="">
      <VCardTitle class="text-h4 text-white mb-2">
        Último anuncio
        <VBtn icon class="size-xs " @click="mostrarModal = true">
          <VIcon>mdi-add</VIcon>
        </VBtn>
      </VCardTitle>
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
                        <AppTextField label="Título" id="nombre" v-model="title" />
                      </VCol>
                      <VCol cols="12" md="12">
                        <AppTextField label="Descripción" id="apellido" v-model="description" />
                      </VCol>
                      <!-- 👉 Form buttons -->
                      <VCol cols="12">
                        <VBtn type="submit" class="me-3" @click="agregarUsuario">Submit</VBtn>
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
      <v-divider></v-divider>
      <br>
      <v-row>
        <v-col cols="6">
          <VCardSubtitle class="text-h6 text-white">
            Título: {{ ultimoItem.title }}
          </VCardSubtitle>
        </v-col>
        <v-col cols="6">
          <VCardSubtitle class="text-h6">
            Descripción: {{ ultimoItem.description }}
          </VCardSubtitle>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <VCardSubtitle class="text-h6 text-white">
            Subido por: {{ userNames[ultimoItem.id_announcement_user] }}
          </VCardSubtitle>
        </v-col>
        <v-col cols="6">
          <VCardSubtitle class="text-h6">
            Hora: {{ formatDate(ultimoItem.updated_at) }}
          </VCardSubtitle>
        </v-col>
      </v-row>
    </VCardItem>
  </VCard>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const mostrarModal = ref(false);
    const ultimoItem = ref({});
    const userNames = ref({});
    const title = ref('');
    const description = ref('');
    const userData = JSON.parse(localStorage.getItem('userData'))

export default {
  setup() {
    

    

    async function fetchUserName(userId) {
      try {
        const response = await axios.get(`https://smarttechnicalcl.000webhostapp.com/api/user/${userId}`);
        const user = response.data.data;
        return `${user.name} ${user.last_name}`;
      } catch (error) {
        console.error(error);
        return '';
      }
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    }

    const agregarUsuario =  () => {
      
        const timestampActual = new Date().getTime();
        const formData = new FormData()
        
          id_announcement_user = userData.id,
          title = title.value,
          description= description.value,
          update_at= timestampActual,
          created_at= timestampActual

          formData.append('id_announcement_user', 1)
          formData.append('title', "sdds")
          formData.append('description', "assa")
          formData.append('created_at', 1687515562)
          formData.append('update_at', 1687515562)
          
       

        // Realizar la solicitud POST a la API
        /*axios.post('https://smarttechnicalcl.000webhostapp.com/api/announcement', formData).then(r => {
        
        // Reiniciar los campos del formulario
        
        

        console.log()
      console.log(response)

      }).catch (e => {
    //const { errors: formErrors } = e.response.data
    console.log(e)

    //errors.value = formErrors
    //console.error(e.response.data)
  })*/
    };
    

    onMounted(async () => {
      try {
        const response = await axios.get('https://smarttechnicalcl.000webhostapp.com/api/announcement');
        const respuesta = response.data;
        const array = Object.values(respuesta.data);
        ultimoItem.value = array[array.length - 1];

        const userAnnouncement = ultimoItem.value.id_announcement_user;

        const userName = await fetchUserName(userAnnouncement);
        userNames.value[userAnnouncement] = userName;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      mostrarModal,
      ultimoItem,
      userNames,
      title,
      description,
      formatDate,
      agregarUsuario
    };
  }
};
</script>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 18px;
}

.size-xs {
  block-size: 24px;
  inline-size: 24px;
  margin-inline-start: 5px;
}

.modal-overlay {
  position: fixed;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  inset: 0;
}

.modal {
  inline-size: 300px;
  transform: translateX(-37%);
}
</style>
