

<template>
  <div>
    <VCard>
      <VCardItem class="text-h5">
        <input
          ref="autocompleteInput"
          type="text"
          v-model="message"
          class="placeBorde"
          @input="updateInput"
          @focus="initializeAutocomplete"
          placeholder="Ingrese dirección"
          
        />
        <h6 v-if="!isValidFormat">El formato no es válido. Debe ser 'Calle Número'.</h6>

        <VBtn  @click="ejecutarMetodos" class="botoncito" :disabled="loading || !isValidFormat"  >
          {{ loading ? 'Cargando...' : 'Registrar' }}
          
        </VBtn>
       
      </VCardItem>
    </VCard>

    

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      selectedPlace: null,
      loading: false,
      isValidFormat: true,
      formatPattern: /^[A-Za-z\s]+ \d+/
    };
  },
  mounted() {
    this.initializeAutocomplete();
  },
  methods: {

    validateFormat() {
      this.isValidFormat = this.formatPattern.test(this.message);
    },
    initializeAutocomplete() {
      const autocompleteInput = this.$refs.autocompleteInput;
      const options = {
        types: ['address'],
        componentRestrictions: { country: 'cl' } // Restringe las sugerencias a Chile
      };
      const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options);

      autocomplete.addListener('place_changed', () => {
        this.selectedPlace = autocomplete.getPlace();
      });
    },
    updateInput(event) {
      this.userInput = event.target.value;
      this.validateFormat()
    },
    async storeSelectedResult() {
      
      if (this.selectedPlace) {
        this.loading = true; 
        // Almacena el resultado seleccionado en una variable de tu elección
        var storedResult = this.selectedPlace;

        console.log('Resultado almacenado:', storedResult);
        localStorage.setItem('place', JSON.stringify(storedResult));

        
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.loading = false;
      } else {
        console.log('Ningún resultado seleccionado');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    },

    sacarCoords(){
      
      var Temp = JSON.parse(localStorage.getItem('place'))
    var lat = Temp.geometry.location.lat
    var lng = Temp.geometry.location.lng
    var address = Temp.formatted_address
    var userTemp = JSON.parse(localStorage.getItem('userData'))
    var user_id = userTemp.id
    const timestamp = new Date().getTime();
    console.log(lat, lng)

    const formData = new FormData()
    formData.append('id_user', user_id)
    formData.append('address', address)
    formData.append('latitude', lat)
    formData.append('longitude', lng)
    formData.append('created_at', timestamp)
    formData.append('updated_at', timestamp)

    console.log("se va a subir:", formData)




    axios.post('http://54.161.75.90/api/position', formData).then(r => {
      console.log("respuesta:", r.data)
      location.reload();
    })
    
  },
  async ejecutarMetodos() {
    this.validateFormat()
    

    
      this.loading = true;
      await this.storeSelectedResult(); // Espera a que se complete el primer método
      this.sacarCoords();
      this.loading = false; // Ejecuta el segundo método después del primero
    
    
    }
}
}
</script>

<style>
.placeBorde{
  border: 2px solid black;
  color: rgb(255, 255, 255);
  padding: 6px;
  border-radius: 5px;
  align-content: center;
}

.botoncito{
align-content: center;
margin-left: 20px;
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
