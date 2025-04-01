// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import 'vuetify/styles' // importa o CSS
import '@mdi/font/css/materialdesignicons.css' // <- se quiser ícones do Vuetify

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
