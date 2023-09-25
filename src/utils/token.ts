import { userInfo } from '@/store/modules/types/type.ts'
// 封装本地存储数据与读取数据方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('userToken', token)
}
// 获取token
export const GET_TOKEN = () => {
  return localStorage.getItem('userToken')
}
// 移除token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('userToken')
}

// 用户存储信息
export const SET_UserInfo = (userInfoData: userInfo) => {
  localStorage.setItem('userInfo', userInfoData)
}
// 获取用户信息
export const GET_UserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo') as string)
}
// 移除用户信息
export const REMOVE_UserInfo = () => {
  localStorage.removeItem('userInfo')
}
