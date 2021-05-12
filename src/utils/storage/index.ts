/*
 * @Descripttion: tiny.jiao@aliyun.com
 * @version:
 * @Author: Tiny
 * @Date: 2021-05-12 07:47:16
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-12 07:48:06
 */
export function localStorageGet (data: string): string {
  if (data) {
    return JSON.parse(window.localStorage.getItem(data) || 'null')
  }
  return ''
}

export function localStorageSet (key:string, value:string): void {
  window.localStorage.setItem(key, value)
}
