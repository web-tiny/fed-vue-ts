<!--
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-04-29 23:24:06
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-15 09:42:19
-->
<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-image
          style="width: 50px; height: 50px"
          :src="userInfo.portrait"
          :fit="fit"></el-image>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { apiGetUserInfo } from '../../services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: '',
      fit: 'cover'
    }
  },
  created () {
    this.fethUserInfo()
    // this.fethUserInfo()
    // this.fethUserInfo()
  },
  methods: {
    async fethUserInfo () {
      const { data } = await apiGetUserInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    },
    handleLogout () {
      this.$store.commit('setUser', null)
      this.$router.push({
        name: 'login'
      })
      this.$message.success('退出成功')
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  height: 100%;
  display: flex;
  align-items: center;

  justify-content: space-between;
}
.el-menu {
  height: 100vh;
}
</style>
