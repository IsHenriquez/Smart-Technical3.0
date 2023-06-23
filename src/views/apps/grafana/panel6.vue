<script setup>
import { useTheme } from 'vuetify'
import dash6 from "@/assets/images/grafana/dash6.png"

const vuetifyTheme = useTheme()
</script>

<template>
  <VCard class="card1">
    <VCardItem class="pb-sm-0">
      <VCardText class="pa-1 textoCarta">
        State
      </VCardText>

      <VImg 
            width="400"
            :src="dash6"
            class="card-image"
            
          />
    
    </VCardItem>
  </VCard>
</template>

<style>
.textoCarta{
  position: relative;
  bottom:5px
}

.card-image{
  position: relative;
  bottom: 10px;

}

</style>
