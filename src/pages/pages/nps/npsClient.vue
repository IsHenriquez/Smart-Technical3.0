<template>
  <div>
    <h2>Net Promoter Score</h2>
    <p>En una escala del 0 al 10?</p>
    <div class="rating">
      <button v-for="score in 10" :key="score" :class="{ 'active': selectedScore === score }" @click="selectScore(score)">
        {{ score === 10 ? '10' : score }} {{ getFace(score) }}
      </button>
    </div>
    <br><br>
    <div v-if="selectedScore !== null && !submitted">
      <button @click="confirmScore" class="buttonps">Confirmar</button>
    </div>
    <div v-if="submitted">
      <p>¡Gracias por tu respuesta!</p>
      <p>Tu puntuación: {{ selectedScore }} {{ getFace(selectedScore) }}</p>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      selectedScore: null,
      submitted: false
    }
  },
  methods: {
    selectScore(score) {
      this.selectedScore = score;
    },
    confirmScore() {
      // Aquí puedes agregar la lógica para enviar el NPS al servidor o realizar otras acciones necesarias
      this.submitted = true;
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
}
</script>

<style scoped>
.rating {
  display: flex;
  justify-content: center;
  margin-block-start: 20px;
}

.buttonps {
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

button.active {
  background-color: #007bff;
  color: #fff;
}
</style>
