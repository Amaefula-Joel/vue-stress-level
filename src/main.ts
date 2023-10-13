
import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'

import PublicNavbar from './components/PublicNavbar.vue'

const app = createApp(App)
app.use(router)
app.component('public-navbar', PublicNavbar)


app.mount('#app')
