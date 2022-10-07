import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入根组件
import App from './App.vue'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './language/i18n'
const app = createApp(App)
// 注册全局数据
app.provide('$url','http://loacalhost:4000')

// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册路由
app.use(router)
// 注册pinia
app.use(createPinia())
// 注册naive组件库
app.use(ElementPlus)
// 注册i18n
app.use(i18n)
app.mount('#app')
