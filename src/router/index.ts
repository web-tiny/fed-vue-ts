import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import layout from '@/loyout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunName: 'login' */ '@/views/login/index.vue')
  },
  {
    name: 'layout',
    path: '/',
    component: layout,
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import(/* webpackChunName: 'home' */ '@/views/home/index.vue')
      },
      {
        name: 'advert',
        path: '/advert',
        component: () => import(/* webpackChunName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        name: 'advert-space',
        path: '/advert-space',
        component: () => import(/* webpackChunName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        name: 'course',
        path: '/course',
        component: () => import(/* webpackChunName: 'course' */ '@/views/course/index.vue')
      },
      {
        name: 'source',
        path: '/source',
        component: () => import(/* webpackChunName: 'course' */ '@/views/source/index.vue')
      },
      {
        name: 'menu',
        path: '/menu',
        component: () => import(/* webpackChunName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        name: 'role',
        path: '/role',
        component: () => import(/* webpackChunName: 'role' */ '@/views/role/index.vue')
      },
      {
        name: 'user',
        path: '/user',
        component: () => import(/* webpackChunName: 'user' */ '@/views/user/index.vue')
      }
    ]
  },
  {
    name: '*',
    path: '/404',
    component: () => import(/* webpackChunName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
