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
      <VBtn class="botoncitosFiltro" @click="filtrarCalendario">
        Filtrar
      </VBtn>
      <VBtn class="botoncitosFiltro" @click="clearCombobox">
        Limpiar
      </VBtn>
      
      
    <VRow>
      <div class="alignDown"><VIcon class="circuloAzul" color="blue">mdi-circle</VIcon> Trabajo</div>
      <div class="alignDown"><VIcon class="circuloRojo" color="blue">mdi-circle</VIcon> Personal</div>
      
    </VRow>
    <addCalendar/>
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
import { ref, onMounted } from 'vue';
import addCalendar from './addCalendar.vue'

export default {
  name: 'App',
  components: {
    addCalendar,
  },

  setup() {




    const selectedOption = ref(null);
    const users = ref([]);
    const isDark = ref(false);
    const checkbox1 = true
    const checkbox2 = true
    const names = ref([]);

    
    
    


    function clearCombobox() {
      selectedOption.value = null;
     

      user_id_actual = (userData && userData.id) ? userData.id : null
      generarCalendario()
    }

    function filtrarCalendario() {
      console.log(selectedOption.value)
      axios.get(`http://54.161.75.90/api/user?filter=[{"operator":"=","value":"${selectedOption.value}","property":"name"}]`).then(response => {
        const idTemp = response.data.data[0].id
        console.log("respuesta", response.data.data[0].id)

        user_id_actual = idTemp
        generarCalendario()

      })
      
    }

    axios.get('http://54.161.75.90/api/user').then(response => {
      users.value = response.data.data;
      
      names.value = users.value.map(user => user.name);

      
    });
   

    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    var user_id_actual = (userData && userData.id) ? userData.id : null

    

    const attributes = ref([]);

    function generarCalendario() {
      axios.get(`http://54.161.75.90/api/event-list?id_user=${user_id_actual}`)
        .then(response => {
          const data = response.data;
          const titlesArray = [];
          const fechaArray = [];
          const tempColorArray = [];
          const transformedArray = [];

          if (data.success && Array.isArray(data.data)) {
            for (const item of data.data) {
              titlesArray.push(item.title);
              fechaArray.push(item.fecha_realizar_servicio);
              tempColorArray.push(item.id_type);
            }

            for (let i = 0; i < tempColorArray.length; i++) {
              if (tempColorArray[i] === 1) {
                transformedArray[i] = "blue";
              } else if (tempColorArray[i] === 2) {
                transformedArray[i] = "red";
              }
            }

            fechaArray.forEach((fecha, index, array) => {
              const [day, month, year] = fecha.split("-");
                const adjustedMonth = parseInt(month);
                array[index] = `${year}-${adjustedMonth}-${day}`;
                });

            attributes.value = [
              ...titlesArray.map((title, index) => ({
                dates: new Date(fechaArray[index]),
                dot: {
                  color: transformedArray[index],
                },
                popover: {
                  label: titlesArray[index]
                },
                
              })),
            ];
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    onMounted(() => {
      generarCalendario()
    });

    
        

    return {
      selectedOption,
      users,
      isDark,
      checkbox1,
      checkbox2,
      names,
      clearCombobox,
      attributes,
      filtrarCalendario,
      generarCalendario
    };
  }
}
</script>

<style>

.circuloAzul {
  font-size: 24px;
  margin-left: 10px;
  color: rgb(45, 45, 211);
}

.circuloRojo {
  font-size: 24px;
  margin-left: 10px;
  color: rgb(211, 45, 45);
}

.alignDown{
  padding-top: 38px;
}

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
