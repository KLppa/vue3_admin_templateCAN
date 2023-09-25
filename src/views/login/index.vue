<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">站位</el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="formData"
          class="login_form"
          :rules="rules"
          validate="Formvalidate"
          ref="FormLogin"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item class="el_form_item" label="Username" prop="username">
            <el-input
              v-model="formData.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item class="el_form_item" label="Password" prop="password">
            <el-input
              v-model="formData.password"
              :prefix-icon="Lock"
              type="password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="isLoading"
              class="login_button"
              type="primary"
              size="large"
              @click="login"
            >
              登陆按钮
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup="setup">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import dateHandle from '@/utils/time.ts'
import useUserStore from '@/store/modules/user.ts'

// 注册路由
const $router = useRouter()
const $route = useRoute()

// 显示登录按钮是否为加载状态
const isLoading = ref(false)

// 引入pinia用户小仓库
let userStore = useUserStore()
const formData = reactive({
  username: 'admin',
  password: 'atguigu123',
})

// 获取el-form组件
let FormLogin = ref()

// 自定义校验规则用户名
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule是校验规则对象 ， value是文本的内容， callback是规则放行函数
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('长度至少5位'))
  }
}
const validatorUserPassword = (rule: any, value: any, callback: any) => {
  // rule是校验规则对象 ， value是文本的内容， callback是规则放行函数
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('长度至少6位'))
  }
}
// 表单校验规则
const rules = reactive({
  username: [
    {
      validator: validatorUserName,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatorUserPassword,
      trigger: 'change',
    },
  ],
})
// login function
const login = async () => {
  // 保证所有的表单相校验通过再发请求
  await FormLogin.value.validate()

  isLoading.value = true
  // 通知仓库发送登陆请求，请求成功跳转展示数据页面，请求失败需要弹出请求失败页面
  // console.log(formData)
  try {
    // 保证登陆成功
    await userStore.userLogin(formData)
    $router.push({
      path: ($route.query.redirect as string) || '/',
    })
    // 登录成功提示消息
    ElNotification({
      title: `hi ,${dateHandle(new Date().getHours())}`,
      type: 'success',
      message: '欢迎回来',
      duration: 1000,
    })
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

dateHandle(new Date().getHours())
</script>

<style lang="scss" scoped>
.el_form_item :deep(.el-form-item__label) {
  color: white;
}
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 10px;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;

    h1 {
      font-size: 36px;
      padding: 10px 0 20px;
    }
    h2 {
      padding: 13px 0;
      font-size: 18px;
    }
    .login_button {
      width: 100%;
    }
  }
}
</style>
