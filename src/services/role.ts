
import request from '@/utils/request'

interface RoleList {
  name: string
}
// 查询角色列表
export const fetchRoleList = (data: RoleList) => request({
  method: 'POST',
  url: '/boss/role/getRolePages',
  data
})

interface RoleUpdate {
  id?: number
  code: string
  name: number
  description: string
}
interface RoleForm {
  roleForm: RoleUpdate
}
// 增加或者更新角色
export const updateOrAddRole = (data: RoleForm) => request({
  method: 'POST',
  url: '/boss/role/saveOrUpdate',
  data
})

// 查询角色详情
export const fetchRoleDetail = (userId: number) => request({
  method: 'GET',
  url: `/boss/role/${userId}`
})

// 查询角色菜单列表(树形结构)
export const fetchRoleMenuList = (roleId: number) => request({
  method: 'GET',
  url: '/boss/menu/getRoleMenus',
  params: {
    roleId
  }
})

interface RoleToMenus {
  roleId?: number // 角色id
  menuIdList?: number[] // 分配的菜单ID列表
}
// 给角色分配菜单
export const dispatchMenuToRole = (data: RoleToMenus) => request({
  method: 'POST',
  url: '/boss/menu/allocateRoleMenus',
  data: {
    allocateRoleMenuForm: data
  }
})
