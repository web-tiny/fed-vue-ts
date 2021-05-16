/*
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-04-29 21:59:40
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-15 16:50:32
 */
import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router/index'

const request = axios.create({

})

// 请求拦截
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    const token = JSON.parse(user)
    config.headers.Authorization = token?.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 刷行token的方法
const refreshToken = () => {
  const token = JSON.parse(store.state.user)
  return axios.create()({
    url: '/front/user/refresh_token',
    method: 'POST',
    data: qs.stringify({
      // refresh_token 只能使用一次
      refreshtoken: token?.refresh_token
    })
  })
}

// 调转到登陆页面, 登陆后还回到跳出登陆到页面
const redirectLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 响应拦截
// 控制多次请求刷新token接口问题
let isRefresh = false
// 存储 刷新 token 接口之间的请求
let requests: any[] = []
request.interceptors.response.use(
  function (response) { // 2xx状态码时走这里
    return response
  },
  function (error) { // 不是 2xx
    if (error.response) { // 请求发出去,收到响应了, 但是状态码超出了2xx
      const { status } = error.response
      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) { // token无效(无token, token无效, token过期)
        /**
         * 如果有 refresh_token, 则尝试使用 refresh_token 获取新的 access_token
         *   ok: 把本次失败的请求重新发出去
         *   failed: 跳转到登陆页面重新获取新的 token
         * 如果没有, 则直接跳转到到登陆页
         */
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }

        if (!isRefresh) {
          isRefresh = true // 开启刷新状态

          // 重新请求 token
          return refreshToken()
            .then(res => {
              if (!res.data.success) { // 失败
                throw new Error('刷新 token api 失败')
              }
              // 刷新 token 成功
              store.commit('setUser', res.data.content)

              // 把 requests 队列中的请求重新发出去
              requests.forEach(cb => cb())

              // 重置 requests
              requests = []
              return request(error.config)
            })
            .catch(error => {
              store.commit('setUser', null)
              redirectLogin()
              return Promise.reject(error)
            })
            .finally(() => {
              isRefresh = false // 重制刷新状态
            })
        }
        // 刷新状态下 把请求挂起到 requests 数组中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
      } else if (status === 403) {
        Message.error('没有权限,请联系管理员')
      } else if (status === 404) {
        Message.error('请求资源不存在')
      } else if (status >= 500) {
        Message.error('服务端错误')
      }
    } else if (error.request) { // 请求发出去, 但是没有收到响应
      Message.error('请求超时, 请刷行重试')
    } else { // 在设置请求时发生了一些事情,触发了一个错误
      Message.error(`请求失败:${error.message}`)
    }
    console.log(444)
    return Promise.reject(error)
  }
)

export default request
