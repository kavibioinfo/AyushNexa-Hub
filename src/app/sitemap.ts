import type { MetadataRoute } from 'next'

// Base URL for your website
const baseUrl = 'https://hub.ayushnexa.com'

// Define all your tools with their slugs, change frequency, and priority
const tools = [
  // Paid Tools
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
    slug: 'expence-tracker',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    slug: 'career-guidance',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  // Free Tools
  {
    slug: 'ai-health-assistance',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    slug: 'emi-calculator',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
]

// Define all your products/growth kits
const products = [
  {
    slug: 'local-business-growth-kit',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    slug: 'medical-professional-growth-kit',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
]

// Static pages (add any additional pages like about, contact, blog, etc.)
const staticPages = [
  {
    slug: '',
    changeFrequency: 'yearly' as const,
    priority: 1.0,
  },
  // Uncomment and add more static pages if you have them
  // {
  //   slug: 'about',
  //   changeFrequency: 'yearly' as const,
  //   priority: 0.5,
  // },
  // {
  //   slug: 'contact',
  //   changeFrequency: 'yearly' as const,
  //   priority: 0.5,
  // },
  // {
  //   slug: 'blog',
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date()

  // Generate URLs for static pages
  const staticPageUrls = staticPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: today,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Generate URLs for tools
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: today,
    changeFrequency: tool.changeFrequency,
    priority: tool.priority,
  }))

  // Generate URLs for products
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/${product.slug}`,
    lastModified: today,
    changeFrequency: product.changeFrequency,
    priority: product.priority,
  }))

  // Combine all URLs
  return [...staticPageUrls, ...toolUrls, ...productUrls]
}