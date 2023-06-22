
<template>
  <div class="external">
    <v-row>
      <v-col cols="4" class="pr-2">
        <VImg :src="photo1" class="auth-illustration" />
        <h4 class="centrar">Load</h4>
      </v-col>
      <v-col cols="4" class="px-2">
        <VImg :src="photo2" class="auth-illustration" />
        <h4 class="centrar">Memory</h4>
      </v-col>
      <v-col cols="4" class="pl-2 ">
        <VImg :src="photo3" class="auth-illustration" />
        <h4 class="centrar">Cores</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="pr-2 ">
        <VImg :src="photo4" class="auth-illustration" />
        <h4 class="centrar abajo">All disks</h4>
      </v-col>
      <v-col cols="4" class="px-2 up">
        <VImg :src="photo5" class="auth-illustration" />
        <h4 class="centrar abajo">Uptime</h4>
      </v-col>
      <v-col cols="4" class="pl-2 up">
        <VImg :src="photo6" class="auth-illustration" />
        <h4 class="centrar abajo">State</h4>
      </v-col>
    </v-row>
    <h6 class="last-text">Última actualización: {{ hora }}</h6>
  </div>
</template>

<script>
import dash1 from "@/assets/images/grafana/dash1.png"
import dash2 from "@/assets/images/grafana/dash2.png"
import dash3 from "@/assets/images/grafana/dash3.png"
import dash4 from "@/assets/images/grafana/dash4.png"
import dash5 from "@/assets/images/grafana/dash5.png"
import dash6 from "@/assets/images/grafana/dash6.png"



import { obtenerDatos } from './apiHora'

export default {
  setup() {
    const hora = ref(null)
    var photo1 = dash1
    var photo2 = dash2
    var photo3 = dash3
    var photo4 = dash4
    var photo5 = dash5
    var photo6 = dash6

    obtenerDatos()
      .then(x => {
        hora.value = x
        console.log(hora)


      }).catch(error => {
        console.error(error)
      })


    return {
      hora, photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      photo6
    }
  },
}
</script>

<style>
.auth-illustration {
  block-size: 170px;
  inline-size: 330px;
}

.external {
  border: 2px solid #7367f0;
  border-radius: 5px;
  margin-inline-end: 20px;
}

.centrar {
  border-radius: 10px;
  background-color: #7367f0;
  text-align: center;
}

.abajo {
  margin-block-end: 15px;
}

.up {
  padding-block-start: 20px;
}

.last-text {
  text-align: end;
}
</style>

