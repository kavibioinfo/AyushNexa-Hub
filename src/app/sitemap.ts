import type { MetadataRoute } from 'next'

const baseUrl = 'https://hub.ayushnexa.com'

// ─── TOOLS: All under /tools/ route (matches your landing page links) ───
const tools = [
  {
    slug: 'vivah-parichay',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    slug: 'resume-builder',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    slug: 'expense-tracker',        // ✅ Fixed: was "expence-tracker"
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    slug: 'career-guidance',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    slug: 'health-assistant',       // ✅ Fixed: was "ai-health-assistance"
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    slug: 'emi-calculator',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
]

// ─── PRODUCTS: All under /products/ route (matches your landing page links) ───
const products = [
  {
    slug: 'business-kit',            // ✅ Fixed: was "local-business-growth-kit"
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    slug: 'medical-kit',             // ✅ Fixed: was "medical-professional-growth-kit"
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
]

// ─── STATIC PAGES ───
const staticPages = [
  {
    path: '',                        // Homepage
    changeFrequency: 'daily' as const,  // ✅ Changed to daily (you update often)
    priority: 1.0,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date()

  // Static pages (homepage)
  const staticPageUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page.path ? '/' + page.path : ''}`,
    lastModified: today,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Tools: /tools/{slug}
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,   // ✅ Added /tools/ prefix
    lastModified: today,
    changeFrequency: tool.changeFrequency,
    priority: tool.priority,
  }))

  // Products: /products/{slug}
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,  // ✅ Added /products/ prefix
    lastModified: today,
    changeFrequency: product.changeFrequency,
    priority: product.priority,
  }))

  return [...staticPageUrls, ...toolUrls, ...productUrls]
}