import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.js";
import { SetupCalendar } from 'v-calendar';

const app = createApp(App)

app.use(SetupCalendar, {})
app.use(createPinia())
app.use(router)

app.mount('#app')
