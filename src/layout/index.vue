<template>
  <div class="layout_container">
    <!-- 左侧菜单 动态追加类名-->
    <div
      class="layout_slider"
      :class="{ fold: SettingStore.fold ? true : false }"
    >
      <Logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          class="el-menu-demo"
          mode="vertical"
          background-color="$base_menu_background"
          text-color="#fff"
          active-text-color="skyblue"
          :default-active="$route.path"
          :collapse="SettingStore.fold"
        >
          <Menu :menuList="UserStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div
      class="layout_tabber"
      :class="{ fold: SettingStore.fold ? true : false }"
    >
      <Taabar />
    </div>

    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: SettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<script lang="ts" setup="setup">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Taabar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting.ts'

// 注册当前路由，这个和useRouter不一样，后者是函数式路由
import { useRoute } from 'vue-router'

// 获取用户相关的小仓库数据
let UserStore = useUserStore()
let SettingStore = useLayOutSettingStore()

let $route = useRoute()
</script>

<!-- 起名字 -->
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  color: white;

  .layout_slider {
    width: $base_menu_width;
    height: 100vh;
    background-color: $base_menu_background;
    transition: all 0.1s;
    .scrollbar {
      height: calc(100vh - $base_header_height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: 48px;
    }
  }
  .layout_tabber {
    position: fixed;
    top: 0;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: $base_header_height;
    transition: all 0.1s;
    &.fold {
      width: calc(100vw - $base_men_min_width);
      left: $base_men_min_width;
    }
  }

  .layout_main {
    position: absolute;
    left: $base_menu_width;
    top: $base_header_height;
    width: calc(100% - $base_menu_width);
    height: calc(100vh - $base_header_height);
    background-color: green($color: #000000);
    padding-left: 20px;
    transition: all 0.1s;
    overflow: auto;
    &.fold {
      width: calc(100vw - $base_men_min_width);
      left: $base_men_min_width;
    }
  }
}
</style>
