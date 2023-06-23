<template>
  <div >
    <vRow >
    <vBtn class="hola1">
    <label class="col-span-2   font-medium">
      Ingresar nueva dirección:
      <input
        
        type="text"
        @input="$emit('update:street', $event.target.value)"
        :value="street"
        ref="streetRef"
        placeholder="Dirección"
        
      />
    </label>
  </vBtn>
</vRow>
  </div>
</template>




<script>
import {onMounted, onUnmounted, ref} from "vue";

export default {
  props: {
    
    street: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const streetRef = ref();
    let autocomplete;

    

    onMounted(() => {
      autocomplete = new google.maps.places.Autocomplete(streetRef.value, {
        types: ["address"],
        componentRestrictions: { country: "CL" },
        fields: ["address_components"]
      });

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const mapping = {
          street_number: "update:streetNumber",
          
        }

        for(const type in mapping) {
          context.emit(mapping[type], "");
        }

        let place = {
          address_components: [],
          ...autocomplete.getPlace()
        }

        place.address_components.forEach((component) => {
          component.types.forEach((type) => {
              if(mapping.hasOwnProperty(type)){
                context.emit(mapping[type], component.long_name);
              }
          });
        });
      });
    });

    onUnmounted(() => {
      if(autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    });

    return {streetRef};
  }
};
</script>

<style>



.hola1{
 width: 1000px;
}



</style>
