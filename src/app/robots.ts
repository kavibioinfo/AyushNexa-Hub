import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block AI crawlers from scraping your paid content
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      // Default: allow all legitimate search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/', '/checkout/', '/thank-you/'],
      },
    ],
    sitemap: 'https://hub.ayushnexa.com/sitemap.xml',
    // Optional: host directive (helps some crawlers)
    host: 'https://hub.ayushnexa.com',
  }
}