const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate()
nextConfig.i18n.localeDetection = false

module.exports = nextConfig
// module.exports = nextTranslate(nextConfig)
