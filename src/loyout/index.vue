<template>
  <el-container>
    <el-aside width="200px">
      <AppAside />
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import AppAside from './component/app-aside.vue'
import AppHeader from './component/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style scoped lang="scss">
.el-container {
  min-width: 800px;
  height: 100vh;
}
.el-aside {
  background: $info-color;
  height: 100vh;
}
.el-header {
  // background: $primary-color;
  // display: flex;
  // align-items: center;
  // padding: 0;
  background: #fff;
}
</style>
