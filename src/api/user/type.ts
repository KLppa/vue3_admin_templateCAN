// 定义用户相关数据的ts类型
// 用户相关登录携带参数的ts类型

export interface loginFormData {
  username: string
  password: string
}
// 定义全部接口返回数据都有的类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 定义获取用户返回数据类型
export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
