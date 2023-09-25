// 路由健全，项目当中的路由能不能被访问，什么情况下对应什么路由访问
import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功,如果是同步文件夹下的，要获取数据就必须要有一个大仓库
import pinia from './store'
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)
import setting from '@/setting.ts'
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  // to：你将要访问的路由对象
  // from：你从哪个路由来
  // next：路由的放行函数
  nprogress.start()
  // 获取token,去判断用户登录，还是未登录
  const token = userStore.token
  // 获取用户的名字 userStore
  const username = userStore.username
  if (token) {
    if (to.path == '/login') next({ path: '/' })
    else {
      // 登录成功之后访问其余六个路由
      if (username) {
        next()
      } else {
        // 如果没有用户信息，那就在守卫这里发请求获取到用户信息存储到store中
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期或者用户手动修改了本地存储token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') next()
    // 如果不是去login，就强行让他去到login
    else next({ path: '/login', query: { redirect: to.path } })
  }
})

// 全军后置守卫
router.afterEach((to: any, from: any) => {
  // to and from are both route objects.
  nprogress.done()
})
// 1.任意路由切换实现进度条业务 --nprogress
// 2.路由鉴权（路由访问权限设置）
// 3.全部路由组件：登录|404|任意路由｜首页｜数据大屏｜权限管理｜商品管理
// ------利用token来判断有没有登录------
// 用户没有登录可以访问login，其余的六个不可以访问，如果访问直接重定向login
// 用户登陆成功之后就不可以访问login，其余都可以访问
