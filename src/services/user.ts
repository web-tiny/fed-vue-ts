/*
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-05-09 17:43:26
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-11 08:16:53
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}
export const apiLogin = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}
