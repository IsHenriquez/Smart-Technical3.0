<script setup>
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
</script>

<template>
  <VCard>
    <VCardItem class="pb-sm-0">
      <VCardText class="pa-1">
        Último ticket reportado
      </VCardText>
      <br>
      <VCardSubtitle>Fecha: </VCardSubtitle>
      <VCardSubtitle>Resumen:  </VCardSubtitle>

      <button
        class="button"
        type="submit"
      >
        Ver
      </button>
    </VCardItem>
  </VCard>
</template>

<style>
.button {
  position: center;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: rgba(110, 48, 216, 50%);
  inline-size: 35%;
  margin-block-start: 20%;
  transform: translateX(90%);
}
</style>
