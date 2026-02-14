/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Para Docker
  transpilePackages: ['@nlw-copa/shared'],
}

module.exports = nextConfig
