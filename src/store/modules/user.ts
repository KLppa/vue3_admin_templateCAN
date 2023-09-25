//  创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index.ts'
// 引入用户登陆数据类型ts
import type { UserState } from './types/type'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
// 引入路由常量路由
import constantRoute from '@/router/routes'

const useUserStore = defineStore('User', {
  // 小仓库对象
  state(): UserState {
    return {
      token: GET_TOKEN() || '', // 用户的唯一标识
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组，就是路由
      username: '',
      avatar: '',
    }
  },
  // 异步或者逻辑
  actions: {
    // 用户登录方法
    async userLogin(data: loginFormData) {
      const res: loginResponseData = await reqLogin(data)

      // 登陆成功-200-token 登陆失败 201-登陆失败错误信息
      if (res.code === 200) {
        // 用于pinia ｜ vuex 存储数据其实利用js对象
        this.token = res.data as string
        // 还需要利用本地存储，持久化存储
        SET_TOKEN(res.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },

    // 获取用户信息
    async userInfo() {
      // 将信息存到仓库中
      const result: userInfoReponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        // 目前没有退出登录的接口，退出登陆接口通知服务器本地用户唯一标识失效
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
