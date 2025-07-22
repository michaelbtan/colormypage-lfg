/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.colormypage.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7, 
  exclude: ['/server-sitemap.xml', '/dashboard', '/dashboard/*'],
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}