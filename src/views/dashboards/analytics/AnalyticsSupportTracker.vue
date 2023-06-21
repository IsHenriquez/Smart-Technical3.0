<script setup>
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const series = [85]
</script>

<template>
  <VCard>
    <VCardTitle>
      <div class="d-flex align-center">
        <h2>Anuncios</h2>
        <VBtn
          icon
          class="size-xs"
        >
          <VIcon>mdi-pencil</VIcon>
        </VBtn>
      </div>
    </VCardTitle>
    <VCardText>
      Anuncio 1
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 18px;
}

.size-xs {
  block-size: 24px;
  inline-size: 24px;
  margin-inline-start: 5px;
}
</style>
