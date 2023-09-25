<template>
  <!-- 顶部左侧的静态 -->
  <el-icon
    style="margin-right: 10px; font-size: 20px; color: black"
    @click="changeIcon"
  >
    <!-- vue3中提供的自动去判断要加载的组件 -->
    <component :is="SettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 标题需要动态展示，通过路由对象 v-for 和v-if 。优先级v-if高，所以要用v-show -->
    <el-breadcrumb-item
      v-for="item in $route.matched"
      :key="item.path"
      :to="{ path: item.path }"
      v-show="item.meta.title"
    >
      <el-icon style="margin-right: 2px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup="setup">
import useLayOutSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'
// 控制折叠还是展开
let SettingStore = useLayOutSettingStore()
let $route = useRoute()
const changeIcon = () => {
  SettingStore.changeFold()
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style lang="scss" scoped></style>
