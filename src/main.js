import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App)
// 新增这一行
app.use(createPinia())
app.use(router)  // 加这行
app.mount('#app')
