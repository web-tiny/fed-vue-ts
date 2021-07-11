/*
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-05-15 09:50:53
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-18 22:10:45
 */

import request from '@/utils/request'

interface Menu {
  id?: number
  name: string
  parentId: number
  href: string
  icon: string
  shown: boolean
  description: string
  orderNum: number
}
interface Form {
  menuForm: Menu
}
export const createOrUpdateMenu = (data: Form) => request({
  method: 'POST',
  url: '/boss/menu/saveOrUpdate',
  data
})

// 获取编辑菜单页面的父级菜单列表
export const getEditMenuInfo = (id = -1) => request({
  method: 'get',
  url: '/boss/menu/getEditMenuInfo',
  params: {
    id
  }
})

// 获取所有菜单
export const getAllMenu = () => request({
  method: 'get',
  url: '/boss/menu/getAll'
})

// 获取所有菜单
export const deleteMenu = (id: number) => request({
  method: 'DELETE',
  url: `/boss/menu/${id}`
})

// 获取菜单详情
export const getMenuDetail = (id: number | string = -1) => request({
  method: 'get',
  url: `/boss/menu/${id}`
})
