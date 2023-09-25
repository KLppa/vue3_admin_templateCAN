<template>
  <div class="logo_catainer">
    <img v-show="setting.logoHidden" :src="setting.logo" alt="" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script lang="ts" setup="setup">
import setting from '@/setting.ts'
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style lang="scss" scoped>
.logo_catainer {
  display: flex;
  align-items: center;
  width: 100%;
  height: $base_menu_logo_height;
  color: white;
  padding: 12px;
  img {
    width: 40px;
    height: 40px;
  }
  span {
    font-size: $base_logo_title_fontSize;
    padding-left: 20px;
    white-space: nowrap; //溢出不换行
    overflow: hidden; //超出部分隐藏
    text-overflow: ellipsis; //超出部分设置省略号显示
  }
}
</style>
