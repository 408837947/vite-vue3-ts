import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

createApp(App).use(router).use(createPinia()).use(naive).mount('#app')
