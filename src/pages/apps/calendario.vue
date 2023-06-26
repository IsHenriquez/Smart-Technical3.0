<template>
  <div class="flex flex-col items-center">
    <v-combobox
      v-model="selectedOption"
      :items="names"
      label="Filtrar por usuario"
      item-text="name"
      item-value="id"
      variant="outlined"
    ></v-combobox>
    <VCol>
    <VRow class="filtros">
      <VBtn class="botoncitosFiltro" @click="mostrarModal = true">
        Filtrar
      </VBtn>
      <VBtn class="botoncitosFiltro" @click="clearCombobox">
        Limpiar
      </VBtn>
      <v-checkbox
        class="checkboxFiltro"
        v-model="checkbox1"
        label="Personal"
        color="error"
        @change="handleCheckbox1Change"
      ></v-checkbox>

      <v-checkbox
        class="checkboxFiltro"
        v-model="checkbox2"
        label="Trabajo"
        color="info"
        @change="handleCheckbox2Change"
      ></v-checkbox>
    </VRow>
  </VCol>
    <div class="space-y-2">
      <VCalendar :initial-page="{ month: 6, year: 2023 }" expanded :is-dark="isDark" :attributes="attributes" class="calendario" />
    </div>
    <div class="flex items-center space-x-2 checkOscuro">
      <v-checkbox class="checkboxFiltro" label="Modo Oscuro" v-model="isDark"></v-checkbox>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {



    const attributes = ref([
  {
    // Boolean
    dot: true,
    dates: [
      new Date(2018, 0, 1),
      new Date(2018, 0, 10),
      new Date(2018, 0, 22),
    ],
  },
  {
    // String
    dot: 'red',
    dates: [
      new Date(2018, 0, 4),
      new Date(2018, 0, 10),
      new Date(2018, 0, 15),
    ],
  },

]);

    const selectedOption = ref(null);
    const users = ref([]);
    const isDark = ref(false);
    const checkbox1 = ref(false);
    const checkbox2 = ref(false);
    const names = ref([]);

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

    function clearCombobox() {
      selectedOption.value = null;
      checkbox1.value = null;
      checkbox2.value = null;
    }

    axios.get('https://smarttechnicalcl.000webhostapp.com/api/user').then(response => {
      users.value = response.data.data;
      names.value = users.value.map(user => user.name);
    });

    const user_id_actual = JSON.parse(localStorage.getItem('userData.id'))

    axios.get(`https://smarttechnicalcl.000webhostapp.com/api/ticket/${user_id_actual}`).then(response => {

    })

    axios.get()

    return {
      selectedOption,
      users,
      isDark,
      checkbox1,
      checkbox2,
      handleCheckbox1Change,
      handleCheckbox2Change,
      names,
      clearCombobox,
      attributes
    };
  }
}
</script>

<style>
.checkboxFiltro,
.calendario,
.botoncitosFiltro {
  margin-top: 20px;
  margin-right: 10px;
  align-content: center;
}

.checkOscuro {
  padding-inline-start: 15px;
  background-color: rgba(0, 0, 0, 0.253);
  border-radius: 10px;
}

.filtros {
  padding-inline-start: 15px;
}

.calendario {
  align-content: center;
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
    align-items: center;
  }

  .filtros {
    padding-inline-start: 0;
    margin-top: 20px;
  }
}
</style>
