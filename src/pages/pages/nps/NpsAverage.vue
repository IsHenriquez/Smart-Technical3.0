<template>
  <div>
    <h2>Promedio del puntaje NPS</h2>
    <p>{{ averageScore }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    averageScore() {
      const scores = JSON.parse(localStorage.getItem('scores'));
      if (!scores || scores.length === 0) {
        return 'No hay puntajes registrados';
      }
      const sum = scores.reduce((acc, score) => acc + score, 0);
      const average = sum / scores.length;
      return `Promedio: ${average.toFixed(1)}`;
    }
  },
  created() {
    const scores = JSON.parse(localStorage.getItem('scores'));
    if (scores) {
      this.$emit('scores-updated', scores);
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}

p {
  font-size: 18px;
  margin-block-start: 10px;
  text-align: center;
}
</style>
