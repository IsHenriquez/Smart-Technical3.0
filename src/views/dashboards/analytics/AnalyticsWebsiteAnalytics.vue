<template>
  <VCard color="primary">
    <VProgressLinear v-if="isLoading" color="primary" indeterminate />
    <VCarousel v-if="!isLoading" cycle :continuous="false" :show-arrows="false" hide-delimiter-background height="auto" class="carousel-delimiter-top-end web-analytics-carousel">
      <VCarouselItem v-for="item in websiteAnalytics" :key="item.name">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <h3 class="text-h3 text-white mb-1">Bienvenido de vuelta</h3>
              <p class="text-sm mb-0">{{ item.cantidad }} usuarios se encuentran disponibles</p>
            </VCol>

  
  <VCol cols="12">
    <VCalendar expanded view="weekly" class="calendario" />
  </VCol>
</VRow>
          
        </VCardText>
      </VCarouselItem>
    </VCarousel>
  </VCard>
</template>

<script>
import sliderBar1 from '@images/illustrations/sidebar-pic-1.png'
import axios from 'axios';

export default {
  data() {
    return {
      isLoading: false,
      websiteAnalytics: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.isLoading = true;

      axios.get('https://smarttechnicalcl.000webhostapp.com/api/user?active=1')
        .then(response => {
          const usuarios_activos = response.data.total;

          this.websiteAnalytics = [
            {
              name: 'Técnicos en terreno',
              slideImg: sliderBar1,
              cantidad: usuarios_activos,
              data: [
                // Agrega tus datos de usuarios aquí
              ]
            }
          ];
        }).catch(error => {
        console.error('Error al obtener usuarios:', error);
      })
      .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.card-website-analytics-img {
  block-size: 150px;
}

@media screen and (min-width: 600px) {
  .card-website-analytics-img {
    position: relative;
    margin: auto;
    inset-block-end: 40px;
    inset-block-start: -1rem;
    inset-inline-end: 1rem;
  }
}

.web-analytics-carousel {
  .v-carousel__controls {
    .v-btn:not(.v-btn--active) {
      opacity: 0.4;
    }
  }
}


</style>
