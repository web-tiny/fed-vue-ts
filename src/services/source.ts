
import request from '@/utils/request'

// 查询资源分类列表
export const fetchCategory = () => request({
  method: 'GET',
  url: '/boss/resource/category/getAll'
})

interface ResourceParams {
  name: string
  url: string
  categoryId: number
  current: number
  size: number
}
// 查询资源列表
export const fetchSourceList = (data: ResourceParams) => request({
  method: 'POST',
  url: '/boss/resource/getResourcePages',
  data
})

// 查询资源详情
export const fetchSourceDetail = (id = -1) => request({
  method: 'GET',
  url: `/boss/resource/${id}`
})

interface ResourceUpdate {
  id?: number
  name: string
  categoryId: number
  url: string
  description: string
}
interface ResourceForm {
  resourceForm: ResourceUpdate
}
// 增加或者更新资源
export const updateOrAddSource = (data: ResourceForm) => request({
  method: 'POST',
  url: '/boss/resource/saveOrUpdate',
  data
})
