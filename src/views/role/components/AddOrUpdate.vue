<template>
  <el-dialog
    :title="this.id === -1 ? '添加角色' : '修改角色'"
    v-loading="loadingDialog"
    :visible="visible"
    @close="closeDialog">
    <el-form
      :model="fromParams"
      ref="fromParams"
      label-width="90px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="fromParams.name" placeholder="资源名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="fromParams.code" placeholder="资源路径" clearable></el-input>
      </el-form-item>
      <el-form-item label="资源描述" prop="description">
        <el-input v-model="fromParams.description" placeholder="资源描述" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import to from 'await-to-js'
import {
  updateOrAddRole,
  fetchRoleDetail
} from '@/services/role'

function formData () {
  return {
    name: '',
    code: '',
    description: ''
  }
}
export default Vue.extend({
  name: 'RoleAddOrUpdate',
  props: {
    id: {
      default: -1,
      type: Number
    },
    visible: {
      required: true,
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      fromParams: formData(),
      loadingDialog: false
    }
  },
  watch: {
    visible: function (v) {
      if (v) {
        if (this.id !== -1) {
          this.apiGetRoleDetail()
        }
      }
    }
  },
  methods: {
    closeDialog () {
      (this.$refs.fromParams as Form).resetFields()
      this.$emit('update:visible', false)
      this.fromParams = formData()
    },

    submitForm () {
      (this.$refs.fromParams as Form).validate((valid: boolean) => {
        if (valid) {
          this.apiUpdateRole()
        } else {
          return false
        }
      })
    },

    async apiUpdateRole () {
      this.loadingDialog = true
      const [err, { data }] = await to(updateOrAddRole(this.fromParams))
      this.loadingDialog = false
      if (!err && data.code === '000000') {
        this.$emit('update:visible', false)
      }
    },

    async apiGetRoleDetail () {
      const [err, { data }] = await to(fetchRoleDetail(this.id))
      if (!err && data.code === '000000') {
        this.fromParams = data.data
      }
    }
  }
})
</script>

<style scoped lang="scss">
</style>
