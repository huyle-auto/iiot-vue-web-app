import './assets/main.css'

import { createApp } from 'vue'

// Vuetify
import vuetify from './vuetify.js'

// Material Design Icons (MDI)
import '@mdi/font/css/materialdesignicons.css'

// Libs
import App from './App.vue'
import router from './router/router.js'
import i18n from './i18n'                              // Internationalization
import 'vuetify-sonner/style.css'
import { VSonner, toast } from 'vuetify-sonner';       // Toast notifications

createApp(App).use(vuetify).use(router).use(i18n).component('VSonner', VSonner).mount('#app')
