/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'innexar.app', 'hq.innexar.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.innexar.app',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005',
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'hq.innexar.app'],
    },
  },
}

module.exports = nextConfig

