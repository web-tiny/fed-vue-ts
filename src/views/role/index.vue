<template>
<el-card class="role-list">
  <el-form
    :inline="true"
    slot="header"
    ref="form"
    class="source-form-inline">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="form.name" placeholder="角色名称" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="loadingTable"
        @click="handleQuery">查询
      </el-button>
      <el-button
        type="primary"
        :disabled="loadingTable"
        @click="resetForm">重置
      </el-button>
      <el-button
        type="primary"
        :disabled="loadingTable"
        @click="handleAdd">添加角色
      </el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="roleList"
    v-loading="loadingTable"
    style="width: 100%">
    <el-table-column prop="id" label="编号" width="60"></el-table-column>
    <el-table-column prop="name" label="角色名称"></el-table-column>
    <el-table-column prop="description" label="描述"></el-table-column>
    <el-table-column prop="createdTime" label="添加时间"></el-table-column>
    <el-table-column label="操作" width="230">
      <template #default="{ row }">
        <el-button
          @click="$router.push({
            name: 'roleMenus',
            params: {
              id: row.id
            }
          })"
          type="text"
          size="small">分配菜单
        </el-button>
        <el-button
          @click="handleUpdate(row)"
          type="text"
          size="small">分配资源
        </el-button>
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
  <AddOrUpdate :id="id" :visible.sync="visible"></AddOrUpdate>
</el-card>
</template>

<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import to from 'await-to-js'
import { fetchRoleList } from '@/services/role'

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    AddOrUpdate: () => import('./components/AddOrUpdate.vue')
  },
  data () {
    return {
      form: {
        name: ''
      },
      roleList: [],
      loadingTable: false,
      id: -1,
      visible: false
    }
  },
  watch: {
    visible: function (v) {
      if (!v) {
        this.handleQuery()
      }
    }
  },
  created () {
    this.apiQueryRoleList()
  },
  methods: {
    handleQuery () {
      this.apiQueryRoleList()
    },

    resetForm () {
      (this.$refs.form as Form).resetFields()
      this.handleQuery()
    },

    async apiQueryRoleList () {
      const [err, { data }] = await to(fetchRoleList(this.form))
      if (!err && data.code === '000000') {
        this.roleList = data.data.records
      }
    },

    handleUpdate (row: any) {
      this.id = row.id
      this.visible = true
    },

    handleDelete (row: any) {
      console.log(row)
    },

    handleAdd () {
      this.id = -1
      this.visible = true
    }
  }
})
</script>

<style scoped lang="scss">

</style>
