<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script lang="ts" setup="setup">
// 接受父组件传递的参数
defineProps({
  // xlink-href 前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用的图标名字
  name: String,

  // 颜色
  color: {
    type: String,
    default: '',
  },

  width: {
    type: String,
    default: '30px',
  },

  height: {
    type: String,
    default: '30px',
  },
})
</script>

<style lang="less" scoped></style>
