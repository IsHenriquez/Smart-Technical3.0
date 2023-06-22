<template>
  <div class="cardContainer">
    <div class="card">
      <p class="weather"></p>
      <svg xml:space="preserve" viewBox="0 0 100 100" height="50px" width="50px" y="0px" x="0px" id="Layer_1"
        version="1.1" class="weather" :style="{ backgroundImage: `url('/${icono}')` }">
      </svg>
      <p class="temp">{{ estado }}</p>
      <p class="temp">{{ temp + "º" }}</p>
      <div class="minmaxContainer">
        <div class="min">
          <p class="minHeading">Min</p>
          <p class="minTemp">{{ temp + "º" }}</p>
        </div>
        <div class="max">
          <p class="maxHeading">Max</p>
          <p class="maxTemp">{{ temp + "º" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerDatos } from './apiClima'
import { ref, computed } from 'vue'

export default {
  setup() {
    const temp = ref(null)
    const estado = ref(null)

    obtenerDatos()
      .then(data => {
        temp.value = data.Temp
        estado.value = data.Estado
      })
      .catch(error => {
        console.error(error)
      })

    const icono = computed(() => {
      if (temp.value < 10) {
        return 'lloviendo.png'; // Reemplaza con el nombre de tu imagen correspondiente al clima frío
      } else if (temp.value < 20) {
        return 'nublado.png'; // Reemplaza con el nombre de tu imagen correspondiente al clima templado
      } else {
        return 'sol.png'; // Reemplaza con el nombre de tu imagen correspondiente al clima cálido
      }
    })

    return {
      temp,
      estado,
      icono,
    }
  },
}
</script>

<style lang="scss">
.cardContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 8.9%);
  border-radius: 10px;
  backdrop-filter: blur(30px);
  background-color: rgba(65, 65, 65, 30.8%);
  block-size: 250px;
  cursor: pointer;
  inline-size: 220px;
  padding-block: 20px;
  padding-inline: 10px;
}

.weather {
  color: rgb(197, 197, 197);
  font-size: 0.7em;
  font-weight: 500;
  letter-spacing: 1.2px;
}

.temp {
  color: white;
  font-size: 1.8em;
}

.minmaxContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
}

.min,
.max {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  inline-size: 50%;
  padding-block: 0;
  padding-inline: 20px;
}

.max {
  align-items: flex-start;
  border-inline-start: 2px solid white;
}

.maxHeading,
.minHeading {
  color: white;
  font-size: 1em;
  font-weight: 600;
  text-align: center;
  transform: translateY(12px);
}

.maxTemp,
.minTemp {
  color: rgb(197, 197, 197);
  font-size: 1em;
  font-weight: 900;
  transform: translateY(-8px);
  transform: translateX(3px);
}

.cardContainer::before {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  background-color: rgb(144, 161, 255);
  block-size: 100px;
  content: "";
  inline-size: 100px;
  inset-block-start: 50px;
  inset-inline-start: 100px;
  transition: all 1s;
}

.cardContainer:hover::before {
  transform: translate(-50px, 50px);
}
</style>
