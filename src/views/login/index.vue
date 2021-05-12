<!--
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-04-29 22:12:04
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-12 08:13:52
-->
<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon :rules="rules"
      ref="ruleForm"
      label-width="100px"
      label-position="top"
      class="ruleForm">
      <h2>登陆</h2>
      <el-form-item label="手机" prop="phone">
        <el-input type="text" v-model.trim="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { apiLogin } from '../../services/user'
// import to from 'await-to-js'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, pattern: /^1\d{10}/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm () {
      (this.$refs.ruleForm as Form).validate((valid: boolean) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login () {
      this.loading = true
      const { data } = await apiLogin({ ...this.ruleForm })
      this.loading = false
      console.log(data)
      if (data.success) {
        this.$store.commit('setUser', data.content)
        this.$message.success('登陆成功')
        this.$router.push({ name: 'home' })
      } else {
        this.$message.error(data.message)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .ruleForm {
    width: 350px;
    border: 8px;
    padding: 10px 20px;
    background: #fff;
    border-radius: 10px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
