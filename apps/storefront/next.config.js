/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@bezier-lab/ui', '@bezier-lab/tokens', '@bezier-lab/3d-engine'],
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
