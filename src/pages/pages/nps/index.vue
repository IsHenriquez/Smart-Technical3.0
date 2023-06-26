<template>
  <div>
    <VCard class="card">
      <h2 class="centertext">Net Promoter Score</h2>
      <p class="centertext">En una escala del 0 al 10?</p>
      <div class="rating">
        <VBtn v-for="score in 10" :key="score" :class="{ 'active': selectedScore === score }" @click="selectScore(score)">
          {{ score === 10 ? '10' : score }} {{ getFace(score) }}
        </VBtn>
      </div>
      <div v-if="selectedScore !== null && !submitted">
        <VBtn @click="confirmScore" class="buttonps">Confirmar</VBtn>
      </div>
    </VCard>
    <br><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedScore: null,
      submitted: false
    };
  },
  methods: {
    selectScore(score) {
      this.selectedScore = score;
    },
    confirmScore() {
      this.submitted = true;
      const scores = JSON.parse(localStorage.getItem('scores')) || [];
      scores.push(this.selectedScore);
      localStorage.setItem('scores', JSON.stringify(scores));
      this.$emit('score-submitted', this.selectedScore);
    },
    getFace(score) {
      if (score >= 8) {
        return '😃';
      } else if (score >= 0 && score <= 3) {
        return '🙁';
      } else {
        return '😐';
      }
    }
  }
};
</script>

<style scoped>
.rating {
  display: flex;
  justify-content: center;
  margin-block-start: 18px;
}

.buttonps {
  margin-block-start: 25px;
  transform: translateX(890%);
}

button {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  margin-block: 0;
  margin-inline: 5px;
  padding-block: 10px;
  padding-inline: 15px;
  transition: background-color 0.3s ease;
}

.centertext {
  text-align: center;
  transform: translateX(2%);
}

.card {
  block-size: 200px;
}

button.active {
  background-color: #007bff;
  color: #fff;
}
</style>
