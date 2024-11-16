/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://cybergoblin.club',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://cybergoblin.club/sitemap.xml',
    ],
  },
  exclude: ['/api/*'],
} 