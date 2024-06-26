const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.media.tumblr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

// module.exports = nextConfig
module.exports = nextTranslate(nextConfig)
