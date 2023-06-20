<template>
  <div class="app">
    <Mapa />
  </div>
</template>

<script>
import Mapa from './Mapas.vue'

export default {
  name: 'App',
  components: {
    Mapa,
  },
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
