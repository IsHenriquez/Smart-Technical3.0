

<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VCardText class="pa-1">
        Último ticket reportado
      </VCardText>
      <br>
      <VCardSubtitle>Fecha: {{formatDate(fecha)}} </VCardSubtitle>
      <VCardSubtitle>Título: {{ titulo }}  </VCardSubtitle>

      <button
        class="button"
        type="submit"
        @click="redirectToPage"
      >
        Ver
      </button>
    </VCardItem>
  </VCard>
</template>

<script>
import axios from 'axios'
const ultimoItem = ref({});
const fecha = ref({});
const titulo = ref({});

export default {
  methods: {
    redirectToPage() {
      // Redirigir a otra página utilizando la ruta deseada
      this.$router.push('/apps/ticket');
    }
  },
  setup(){ 
    
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return ` ${day}/${month}/${year}`;
    }
    
    onMounted(async () => {
      try {
        const response = await axios.get('http://54.161.75.90/api/ticket?filter=[{"operator":"=","value":"1","property":"id_category"}]');
        const respuesta = response.data;
        const array = Object.values(respuesta.data);
        ultimoItem.value = array[array.length - 1];

         fecha.value = ultimoItem.value.created_at
         titulo.value = ultimoItem.value.title


        

       
      } catch (error) {
        console.error(error);
      }
    });
    return {
      fecha,
      titulo,
      formatDate
    }
    
  }

};


</script>

<style>
.button {
  position: center;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: rgba(110, 48, 216, 50%);
  inline-size: 35%;
  margin-block-start: 20%;
  transform: translateX(90%);
}
</style>
