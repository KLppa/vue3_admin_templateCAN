// 统一管理项目用户相关的接口
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './type'
// 项目用户相关的请求地址

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 泛型的第二个参数是服务器返回的参数，就是函数返回的参数类型
// 登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)

// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
