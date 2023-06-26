<script setup>
import { useTheme } from 'vuetify'
import dash5 from "@/assets/images/grafana/dash5.png"

const vuetifyTheme = useTheme()
</script>

<template>
  <VCard class="card1">
    <VCardItem class="pb-sm-0">
      <VCardText class="pa-1 textoCarta">
        Uptime
      </VCardText>

      <VImg 
            width="400"
            :src="dash5"
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
