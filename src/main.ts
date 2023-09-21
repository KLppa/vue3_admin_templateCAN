import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import './style/index.scss'
import 'element-plus/dist/index.css'
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
app.use(globalcomponent)
// 安装自定义插件
app.mount('#app')

import 'virtual:svg-icons-register'
// 一次性注册所有的图标组件
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
//   console.log(key, component)
// }
