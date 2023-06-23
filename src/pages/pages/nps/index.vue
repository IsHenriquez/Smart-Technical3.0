<template>
  <VLayout>


    <VMain />
  </VLayout>
</template>


<script>
import axios from 'axios'

export default {
  setup(){
    axios.delete('https://smarttechnicalcl.000webhostapp.com/api/announcement/1').then(r => {
      console.log(r)
    })
  }
}
</script>
