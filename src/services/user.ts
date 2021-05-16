
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}
export const apiLogin = (data: User) => request({
  method: 'POST',
  url: '/front/user/login',
  data: qs.stringify(data)
})

export const apiGetUserInfo = () => request({
  method: 'GET',
  url: '/front/user/getInfo'
})
