/*
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-04-21 00:09:13
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-12 07:49:10
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { localStorageGet, localStorageSet } from '@/utils/storage/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorageGet('user')
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      localStorageSet('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
