// 对外暴露插件对象
import SvgIcon from './SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGloablComponent = { SvgIcon }
export default {
  // 务必叫install方法
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  install(app) {
    // 注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      app.component(key, allGloablComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
