import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import roleDirective from '@/directives/roleDirective';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.directive('role', roleDirective);
app.use(router)

app.mount('#app')
