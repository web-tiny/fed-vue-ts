<!--
 * @Descripttion: tiny.jiao@aliyun.com
 * @version: 
 * @Author: Tiny
 * @Date: 2021-04-28 22:25:30
 * @LastEditors: Tiny
 * @LastEditTime: 2021-05-31 22:17:37
-->

1. qs模块设置请求头格式, 自己安装, 在axios找对应的用法

2. Token 过期的两种解决方式:
   1. 请求前拦截, 通过服务端给一个过期时间, 但是这个过期时间有可能在客户端篡改
   2. 响应里做拦截, 401的时候做一些处理, 需要多一次请求

3. 账号
   用户名：15510792995   密码：111111
   用户名： 18201288771  密码： 111111

4. axios 对请求封装了一个方法: onloadProgress(e), e.loaded(已上传的文件大小), e.total(上传文件的总大小), 可以通过这个方法设置上传进度
5. 富文本编辑器: ckeditor5 / qill / wangeditor