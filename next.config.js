/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ads-partners.coupang.com https://coupa.ng https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data:",
              "connect-src 'self' https: http: ws: wss:",
              "frame-src 'self' https://ads-partners.coupang.com https://coupa.ng",
              "frame-ancestors 'self'",
              "object-src 'none'"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 