<template>
  <el-dialog
    :title="this.id === -1 ? '新增资源' : '修改资源'"
    v-loading="loadingDialog"
    :visible="visible"
    @close="closeDialog">
    <el-form
      :model="fromParams"
      ref="fromParams"
      label-width="90px"
      :rules="rules">
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
  fetchCategory,
  updateOrAddSource,
  fetchSourceDetail
} from '@/services/source'

function formData () {
  return {
    name: '',
    url: '',
    categoryId: '',
    description: ''
  }
}
export default Vue.extend({
  name: 'SrouceAddOrUpdate',
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
      categoriyList: [],
      loadingDialog: false,
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择资源分类', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible: function (v) {
      if (v) {
        this.apiQueryCategory()
        if (this.id !== -1) {
          this.apiGetSourceDetail()
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
          this.apiUpdateResource()
        } else {
          return false
        }
      })
    },
    async apiQueryCategory () {
      const [err, { data }] = await to(fetchCategory())
      if (!err && data.code === '000000') {
        this.categoriyList = data.data
      }
    },

    async apiUpdateResource () {
      this.loadingDialog = true
      const [err, { data }] = await to(updateOrAddSource(this.fromParams))
      this.loadingDialog = false
      console.log(data)
      if (!err && data.code === '000000') {
        this.$emit('update:visible', false)
      }
    },
    async apiGetSourceDetail () {
      const [err, { data }] = await to(fetchSourceDetail(this.id))
      if (!err && data.code === '000000') {
        const { name, url, categoryId, description, id } = data.data
        this.fromParams = Object.assign(
          {},
          {
            name, url, categoryId, description, id
          })
      }
    }
  }
})
</script>

<style scoped lang="scss">

</style>
