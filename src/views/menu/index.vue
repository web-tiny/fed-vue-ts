<!--
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-04-29 22:14:13
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-15 18:11:33
-->
<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="text" @click="$router.push({ name: 'menu-create' })">添加菜单</el-button>
      </div>
      <el-table
        :data="menuLists"
        style="width: 100%">
        <el-table-column type="index" label="编号" width="60"></el-table-column>
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column prop="level" label="菜单级数"></el-table-column>
        <el-table-column prop="icon" label="菜单图标"></el-table-column>
        <el-table-column prop="orderNum" label="排序"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
              @click="handleUpdate(row)"
              type="text"
              size="small">编辑
            </el-button>
            <el-button
              @click="handleDelete(row)"
              type="text"
              size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import to from 'await-to-js'
import { getAllMenu, deleteMenu } from '../../services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menuLists: []
    }
  },
  created () {
    this.fetchAllMenu()
  },
  methods: {
    async fetchAllMenu () {
      const [err, { data }] = await to(getAllMenu())
      if (!err && data.code === '000000') {
        this.menuLists = data.data
      }
    },
    handleUpdate (row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row: any) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.apiDelete(row)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    async apiDelete (row: any) {
      const [err, { data }] = await to(deleteMenu(row.id))
      if (!err && data.code === '000000') {
        this.$message.success('删除成功!')
        this.fetchAllMenu()
      }
    }
  }
})
</script>

<style scoped lang="scss">
</style>
