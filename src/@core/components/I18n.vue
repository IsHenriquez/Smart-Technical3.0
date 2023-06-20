<script setup>
const props = defineProps({
  languages: {
    type: Array,
    required: true,
  },
  location: {
    type: null,
    required: false,
    default: 'bottom end',
  },
})

const emit = defineEmits(['change'])

const { locale } = useI18n({ useScope: 'global' })

watch(locale, val => {
  document.documentElement.setAttribute('lang', val)
})

const currentLang = ref(['en'])
</script>

<template>
  <IconBtn>
    <VIcon
      size="26"
      icon="tabler-language"
    />

    <!-- Menu -->
    <VMenu
      activator="parent"
      :location="props.location"
      offset="14px"
    >
      <!-- List -->
      <VList
        v-model:selected="currentLang"
        min-width="175px"
      >
        <!-- List item -->
      </VList>
    </VMenu>
  </IconBtn>
</template>
