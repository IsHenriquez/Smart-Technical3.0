<template>
  <div class="app">
    <Mapa v-if=" usuarioSecr ||usuarioAdmin === true"/>
    <VBtn v-if="usuarioTec === true" prepend-icon="tabler-plus" @click="mostrarModal = true">
        Agregar Ubicación
      </VBtn>
  </div>
</template>

<script>
import Mapa from './Mapas.vue'

export default {
  name: 'App',
  components: {
    Mapa,
  },

  setup(){
    var usuarioSecr = false
    var usuarioTec = false
    var usuarioAdmin = false

    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const userType = (userData && userData.id_user_type) ? userData.id_user_type : null

    if(userType === 3){
      usuarioSecr = true
    }

    else if (userType === 2){
      usuarioTec = true
    }

    else if (userType === 1){
      usuarioAdmin = true
    }

    return{
      usuarioSecr,
      usuarioTec,
      usuarioAdmin
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family:
    source-code-pro,
    Menlo,
    Monaco,
    Consolas,
    "Courier New",
    monospace;
}

.app {
  text-align: center;
}
</style>
