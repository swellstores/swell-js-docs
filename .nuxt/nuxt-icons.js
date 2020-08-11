export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64.233603.png","120x120":"/_nuxt/icons/icon_120.233603.png","144x144":"/_nuxt/icons/icon_144.233603.png","152x152":"/_nuxt/icons/icon_152.233603.png","192x192":"/_nuxt/icons/icon_192.233603.png","384x384":"/_nuxt/icons/icon_384.233603.png","512x512":"/_nuxt/icons/icon_512.233603.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
