<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单'}}</span>
      </div>
      <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px" class="demo-menuForm">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="menuForm.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="menuForm.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              v-for="menu in parentMenu"
              :key="menu.id"
              :label="menu.name"
              :value="menu.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="menuForm.description"></el-input>
        </el-form-item>
        <el-form-item label="菜单图表" prop="icon">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="menuForm.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单序号">
          <el-input-number v-model="menuForm.orderNum" :min="1" :max="10" ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loadingForm"
            @click="submitForm('menuForm')">
            提交
          </el-button>
          <el-button @click="resetForm('menuForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo, getMenuDetail } from '@/services/menu'
import { Form } from 'element-ui'
import to from 'await-to-js'
function menuForm () {
  return {
    name: '',
    parentId: -1,
    href: '',
    icon: '',
    shown: false,
    description: '',
    orderNum: 1,
    id: 0
  }
}
export default Vue.extend({
  name: 'MenuCreate',
  props: {
    isEdit: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      menuForm: menuForm(),
      loadingForm: false,
      parentMenu: [],
      rules: {
        name: [
          { required: true, message: '请输入菜单名', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择父级菜单', trigger: 'change' }
        ],
        href: [
          { required: true, message: '请输入菜单路径', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.apiGetParentMenu()
    if (this.isEdit) {
      this.apiFetchDetail()
    }
  },
  methods: {
    submitForm () {
      (this.$refs.menuForm as Form).validate((valid: boolean) => {
        if (valid) {
          this.apiUpdateMenu()
        } else {
          return false
        }
      })
    },

    async apiFetchDetail () {
      const [err, { data }] = await to(getMenuDetail(this.$route.params.id))
      if (!err && data.code === '000000') {
        this.menuForm = data.data
      }
    },

    async apiGetParentMenu () {
      const [err, { data }] = await to(getEditMenuInfo())
      if (!err && data.code === '000000') {
        this.parentMenu = data.data.parentMenuList
      }
    },

    async apiUpdateMenu () {
      const [err, { data }] = await to(createOrUpdateMenu(this.menuForm
      ))
      if (!err && data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
      } else {
        this.$message.warning(data.mesg)
      }
    },

    resetForm () {
      (this.$refs.menuForm as Form).resetFields()
    }
  }
})
</script>

<style scoped lang="scss">
</style>
