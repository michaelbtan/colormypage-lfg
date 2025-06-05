import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/account/',
        '/check-email/',
        '/confirm/',
        '/api/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: 'https://colormypage.com/sitemap.xml',
  }
}