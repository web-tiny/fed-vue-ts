/*
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-05-12 07:47:16
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-15 09:41:20
 */
export function localStorageGet (data: string): any {
  return JSON.parse(window.localStorage.getItem(data) || 'null')
}

export function localStorageSet (key:string, value:string): void {
  window.localStorage.setItem(key, JSON.stringify(value))
}
