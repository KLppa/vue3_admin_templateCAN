import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './style/index.scss'
import 'element-plus/dist/index.css'
import router from './router'
import pinia from './store'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error 自定义插件
import globalcomponent from '@/components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// 配置国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(pinia)
app.use(globalcomponent)
// 安装自定义插件
app.mount('#app')

// 引入路由健全功能
import './permisstion'

import 'virtual:svg-icons-register'
