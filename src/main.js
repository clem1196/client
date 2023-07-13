import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import style from './assets/style.css'

createApp(App).use(router,style).mount('#app')
