
<!--HOLA-->
<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center">
        <h6>Última actualización: {{ hora }}</h6>
      </div>
    </VCardText>
  </VCard>
</template>

<script>

import { ref } from 'vue';
import { obtenerDatos } from './apiHora';
export default {
  setup() {
    const hora = ref(null);

    obtenerDatos()
      .then(x => {
        hora.value = x;
        console.log(hora);
      })
      .catch(error => {
        console.error(error);
      });

    return {
      hora
    };
  }
};
</script>

