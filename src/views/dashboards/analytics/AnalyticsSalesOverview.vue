<template>
  <VCard>
    <VCardText class="pa-5">
      <h2 class="d-flex align-center justify-space-between">
        {{ saludo }} 
      </h2>
      <h4>
        Clima actual:
        <br>
        {{ estado }}
        <br>
        {{ temp }} {{ cantidad }}
      </h4>
    </VCardText>
  </VCard>
</template>

<script>
import { onMounted, ref } from 'vue'
import { obtenerDatos } from './apiClima' // Asegúrate de ajustar la ruta al archivo api.js
import { obtenerDatosUser } from './apiUsers'



export default {
  setup() {
    const temp = ref(null)
    const estado = ref(null)
    const saludo = ref('')
    const cantidad = ref(null)

    obtenerDatos()
      .then(data => {
        temp.value = data.Temp
        estado.value = data.Estado
        
        
      })
      .catch(error => {
        console.error(error)
      })

    obtenerDatosUser()
      .then(data => {
        cantidad.value = data.total
        
        
      })
      .catch(error => {
        console.error(error)
      })

    onMounted(() => {
      const horaActual = new Date().getHours()

      if (horaActual >= 6 && horaActual < 12) {
        saludo.value = 'Buenos días'
      } else {
        saludo.value = 'Buenas noches'
      }
    })

    return {
      temp, estado, saludo, cantidad,
    }
  },
}
</script>

<style>
h4 {
  justify-content: center;
  margin-block-start: 10%;
  text-align: center;
}
</style>


