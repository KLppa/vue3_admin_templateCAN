// 对外暴露插件对象
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
const allGloablComponent = { SvgIcon, Pagination }
export default {
  // 务必叫install方法
  install(app) {
    // 注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
  },
}
