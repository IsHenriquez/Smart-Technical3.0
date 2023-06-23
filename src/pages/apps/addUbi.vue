<template>
  <div>
    <input
      ref="autocompleteInput"
      type="text"
      placeholder="Ingrese una ubicación"
      @input="updateInput"
      @focus="initializeAutocomplete"
    />
    <button @click="storeSelectedResult">Almacenar resultado seleccionado</button>
    <button @click="sacarCoords">Guardar</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      selectedPlace: null
    };
  },
  mounted() {
    this.initializeAutocomplete();
    
  },
  methods: {
    initializeAutocomplete() {
      const autocompleteInput = this.$refs.autocompleteInput;
      const options = {
        componentRestrictions: { country: 'cl' } // Restringe las sugerencias a Chile
      };
      const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options);

      autocomplete.addListener('place_changed', () => {
        this.selectedPlace = autocomplete.getPlace();
      });
    },
    updateInput(event) {
      this.userInput = event.target.value;
    },
    storeSelectedResult() {
      if (this.selectedPlace) {
        // Almacena el resultado seleccionado en una variable de tu elección
        var storedResult = this.selectedPlace;

        console.log('Resultado almacenado:', storedResult);
        localStorage.setItem('place', JSON.stringify(storedResult));
      } else {
        console.log('Ningún resultado seleccionado');
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




    axios.post('https://smarttechnicalcl.000webhostapp.com/api/position', formData).then(r => {
      console.log("respuesta:", r.data)
      location.reload();
    })
    
  }
}
}
</script>
