const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig
module.exports = nextTranslate(nextConfig)
