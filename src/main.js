/* eslint-disable import/order */

import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import ability from '@/plugins/casl/ability'
import i18n from '@/plugins/i18n'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { abilitiesPlugin } from '@casl/vue'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import GMaps from 'gmaps'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


loadFonts()


// Create vue app
const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})
app.use(VCalendar, {})


app.config.globalProperties.$gmaps = GMaps

// Mount vue app
app.mount('#app')
