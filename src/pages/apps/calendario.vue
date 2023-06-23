<template>
  <div class="flex flex-col items-center">
    <v-combobox
      label="Combobox"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      variant="outlined"
    ></v-combobox>

    <v-checkbox
      v-model="checkbox1"
      label="Checkbox Rojo"
      color="error"
      @change="handleCheckbox1Change"
    ></v-checkbox>

    <v-checkbox
      v-model="checkbox2"
      label="Checkbox Azul"
      color="info"
      @change="handleCheckbox2Change"
    ></v-checkbox>

    <div class="space-y-2">
      <div class="flex items-center space-x-2">
        <input id="darkmode" type="checkbox" v-model="isDark" />
        <label for="darkmode"> Dark Mode </label>
      </div>
      <VCalendar expanded :is-dark="isDark" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(false);
const checkbox1 = ref(false);
const checkbox2 = ref(false);

function handleCheckbox1Change() {
  if (checkbox1.value) {
    checkbox2.value = false;
  }
}

function handleCheckbox2Change() {
  if (checkbox2.value) {
    checkbox1.value = false;
  }
}
</script>

<style>
/* Agrega estilos personalizados si es necesario */
</style>
