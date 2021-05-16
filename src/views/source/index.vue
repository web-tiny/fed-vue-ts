<template>
<el-card class="source-list">
  <el-form
    :inline="true"
    slot="header"
    :model="fromParams"
    ref="fromParams"
    class="source-form-inline">
    <el-form-item label="资源名称" prop="name">
      <el-input v-model="fromParams.name" placeholder="资源名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="资源路径" prop="url">
      <el-input v-model="fromParams.url" placeholder="资源路径" clearable></el-input>
    </el-form-item>
    <el-form-item label="资源分类" prop="categoryId">
      <el-select v-model="fromParams.categoryId" placeholder="资源分类" clearable>
        <el-option
          v-for="item in categoriyList"
          :label="item.name"
          :key="item.id"
          :value="item.id">
        </el-option>
      </el-select>
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
        @click="handleAdd">添加
      </el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="resourceList"
    v-loading="loadingTable"
    style="width: 100%">
    <el-table-column type="index" label="编号" width="60"></el-table-column>
    <el-table-column prop="name" label="资源名称"></el-table-column>
    <el-table-column prop="url" label="资源路径"></el-table-column>
    <el-table-column prop="description" label="描述"></el-table-column>
    <el-table-column prop="createdTime" label="添加时间"></el-table-column>
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
  <el-pagination
    :disabled="loadingTable"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="fromParams.current"
    :page-sizes="[10, 20, 30]"
    :page-size="fromParams.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <AddOrUpdate :id="id" :visible.sync="visible"></AddOrUpdate>
</el-card>
</template>

<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import to from 'await-to-js'
import { fetchCategory, fetchSourceList } from '@/services/source'

function formData () {
  return {
    name: '',
    url: '',
    categoryId: '',
    current: 1,
    size: 10
  }
}
export default Vue.extend({
  name: 'SrouceIndex',
  components: {
    AddOrUpdate: () => import('./components/AddOrUpdate.vue')
  },
  data () {
    return {
      fromParams: formData(),
      categoriyList: [],
      resourceList: [],
      total: 0,
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
    this.apiQueryCategory()
    this.apiGetResourceList()
  },
  methods: {
    handleQuery () {
      this.fromParams.current = 1
      this.apiGetResourceList()
    },

    resetForm () {
      (this.$refs.fromParams as Form).resetFields()
      this.handleQuery()
    },

    async apiQueryCategory () {
      const [err, { data }] = await to(fetchCategory())
      if (!err && data.code === '000000') {
        this.categoriyList = data.data
      }
    },

    async apiGetResourceList () {
      this.loadingTable = true
      const [err, { data }] = await to(fetchSourceList(this.fromParams))
      this.loadingTable = false
      if (!err && data.code === '000000') {
        const { total, records } = data.data
        this.resourceList = records
        this.total = total
      }
    },

    handleUpdate (row: any) {
      this.id = row.id
      this.visible = true
    },

    handleDelete (row: any) {
      console.log(row)
    },

    handleSizeChange (val: number) {
      this.fromParams.size = val
      this.fromParams.current = 1
      this.apiGetResourceList()
    },

    handleCurrentChange (val: number) {
      this.fromParams.current = val
      this.apiGetResourceList()
    },

    handleAdd () {
      this.id = -1
      this.visible = true
    }
  }
})
</script>

<style scoped lang="scss">
.source-list {
  .source-form-inline {
    display: flex;
    justify-content: space-between;
  }
}
</style>
