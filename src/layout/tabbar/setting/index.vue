<template>
  <el-button
    type="primary"
    size="large"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>

  <el-button
    type="primary"
    size="large"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>

  <el-button type="primary" size="large" icon="setting" circle></el-button>
  <img
    :src="userStore.avatar || '../../../../public/avatar.jpg'"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 10px"
  />

  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup="setup">
// 获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
let SettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
// 刷新更新 利用到了nextTick
const updateRefsh = () => {
  SettingStore.refsh = !SettingStore.refsh
}

// fullScreen全屏模式
const fullScreen = () => {
  let full = document.fullscreenElement
  // 如果不是全屏就切换全屏模式,利用这个方法可以去实现全屏模式
  if (!full) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}

// 退出登录
const logout = async () => {
  // 1.需要想服务器发请求(退出登录的请求)
  // 2.仓库当中关于相关的数据清空[token | username | avatar]
  // 3.跳转到登录页面
  await userStore.userLogout()
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  color: white;
  margin-right: 10px;
}
</style>
