/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'recruitment-free-images.s3.eu-west-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/:path*' // Proxy to Backend
        }
      ]
    }
  }
