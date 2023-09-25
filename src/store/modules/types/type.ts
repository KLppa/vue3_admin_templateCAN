// 定义小仓库数据state类型
import type { RouteRecordRaw } from 'vue-router'
export type userInfo = {
  username: string
  avatar: string
}
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
