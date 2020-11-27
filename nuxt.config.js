import theme from '@nuxt/content-theme-docs'

export default theme({
  router: {
    base: '/docs/js/'
  },
  hooks: {
    'vue-renderer:ssr:templateParams': function(params) {
      params.HEAD = params.HEAD.replace('<base href="/docs/js/">', '')
    }
  }
})
