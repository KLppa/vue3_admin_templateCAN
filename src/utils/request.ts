// 进行axios二次封装：使用请求拦截器和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'
// 第一步利用axios对象的create方法去创建一个axios实力对象，可以方便其他配置
const request = axios.create({
  // 基础路径会携带/api
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, //超时时间
})

// 第二步给axios实力添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数 获取用户的token，因为你第一次已经登录拿到token了，所以需要在仓库里拿
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // 返回配置对象，不然请求都发不出去
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的回调
    return response.data
  },
  (error) => {
    // 失败的回调，一般处理网络错误
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址过期'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
