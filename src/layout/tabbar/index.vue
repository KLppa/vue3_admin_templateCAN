<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>

    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script lang="ts" setup="setup">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style scoped>
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #f1f2b5, #18545a);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
}
</style>
