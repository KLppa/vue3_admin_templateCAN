// 小仓库：关于layout组件相关配置的仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用于控制菜单折叠还是展开的控制
      refsh: false, //仓库的属性用于控制刷新效果
    }
  },
  actions: {
    changeFold() {
      this.fold = !this.fold
    },
  },
  getters: {},
})

export default useLayOutSettingStore
