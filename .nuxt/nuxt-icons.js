export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64.8f91ea.png","120x120":"/_nuxt/icons/icon_120.8f91ea.png","144x144":"/_nuxt/icons/icon_144.8f91ea.png","152x152":"/_nuxt/icons/icon_152.8f91ea.png","192x192":"/_nuxt/icons/icon_192.8f91ea.png","384x384":"/_nuxt/icons/icon_384.8f91ea.png","512x512":"/_nuxt/icons/icon_512.8f91ea.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
