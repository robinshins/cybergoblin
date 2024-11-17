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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ads-partners.coupang.com https://coupa.ng",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data:",
              "connect-src 'self' https: http: ws: wss:",
              "frame-src 'self' https://ads-partners.coupang.com https://coupa.ng",
              "object-src 'none'"
            ].join('; ')
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "frame-ancestors 'self' https://ads-partners.coupang.com https://coupa.ng"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 