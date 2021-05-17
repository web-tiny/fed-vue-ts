
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import layout from '@/loyout/index.vue'
import store from '@/store/index'
// import { localStorageGet } from '@/utils/storage/index'

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
    meta: {
      requiresAuth: true
    },
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
        name: 'menu-create',
        path: '/menu-create',
        component: () => import(/* webpackChunName: 'menu-create' */ '@/views/menu/create.vue')
      },
      {
        name: 'menu-edit',
        path: '/menu/:id/edit',
        component: () => import(/* webpackChunName: 'menu-create' */ '@/views/menu/edit.vue')
      },
      {
        name: 'role',
        path: '/role',
        component: () => import(/* webpackChunName: 'role' */ '@/views/role/index.vue')
      },
      {
        name: 'roleMenus',
        path: '/role/:id/menus',
        component: () => import(/* webpackChunName: 'role-menus' */ '@/views/role/menus.vue'),
        props: true
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

// 全局守卫, 通过路由元信息灵活配置
router.beforeEach((to, from, next) => {
  // to.matched 是一个路由数组(匹配到到路由记录)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        // 登陆后回到退出的页面
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
