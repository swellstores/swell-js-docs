import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ccfb7a5e = () => interopDefault(import('../node_modules/@nuxt/content-theme-docs/src/pages/releases.vue' /* webpackChunkName: "pages/releases" */))
const _23e52f2a = () => interopDefault(import('../node_modules/@nuxt/content-theme-docs/src/pages/_.vue' /* webpackChunkName: "pages/_" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/releases",
    component: _ccfb7a5e,
    name: "releases___en"
  }, {
    path: "/*",
    component: _23e52f2a,
    name: "all___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
