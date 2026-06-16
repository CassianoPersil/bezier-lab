/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bezier-lab/ui', '@bezier-lab/tokens'],
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
