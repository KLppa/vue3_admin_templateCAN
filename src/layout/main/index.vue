<template>
  <div class="main">
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由的子路由 -->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup="setup">
// nextTick 当响应式数据发生变化之后可以获取到更新后的dom
import { ref, watch, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
let SettingStore = useLayOutSettingStore()

// 控制当前组件是否重新创建
let flag = ref(true)
// 监听仓库内部数据是否发生变化
watch(
  () => SettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style lang="scss" scoped>
.main {
  margin-top: 30px;
}
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
