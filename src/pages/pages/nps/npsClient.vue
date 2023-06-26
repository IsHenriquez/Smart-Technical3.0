<template>
  <div>
    <VCard class="cardnps">
      <NpsAverage />
    </VCard>
  </div>
</template>

<script>
import NpsAverage from './NpsAverage.vue';

export default {
  components: {
    NpsAverage
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  inline-size: 100%;
}

.cardnps {
  inline-size: 850px;
  transform: translateX(17%);
}

th,
td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>
