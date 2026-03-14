import { NextResponse } from "next/server";

/**
 * Generate dynamic robots.txt for search engine crawling rules
 * Tells search engines what they can and cannot crawl
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beautiful-store.vercel.app";

  const robots = `# robots.txt for ${baseUrl}
# Generated dynamically by Beautiful Store SEO Engine

# Allow all search engines to crawl
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling (optional)
Crawl-delay: 1

# Block admin and API routes from indexing
User-agent: *
Disallow: /admin
Disallow: /admin/*
Disallow: /api
Disallow: /api/*
Disallow: /login
Disallow: /signup
Disallow: /profile

# Block sensitive paths
Disallow: /*?*
Disallow: /*&*

# Allow main pages
Allow: /
Allow: /products
Allow: /products/*
Allow: /cart

# Google specific rules
User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /login
Disallow: /signup
Disallow: /profile

# Bing specific rules
User-agent: Bingbot
Allow: /
Disallow: /admin
Disallow: /api

# Block image indexing for admin areas
User-agent: Googlebot-Image
Allow: /
Disallow: /admin

# Block mobile crawlers from admin
User-agent: Googlebot-Mobile
Allow: /
Disallow: /admin

# Block social media crawlers from sensitive areas
User-agent: facebookexternalhit
Allow: /
Disallow: /admin
Disallow: /api

User-agent: Twitterbot
Allow: /
Disallow: /admin
Disallow: /api

# Block bad bots (optional aggressive protection)
# User-agent: AhrefsBot
# User-agent: SemrushBot
# User-agent: MJ12bot
# Disallow: /

# Host (optional, for single host sitemaps)
Host: ${baseUrl}
`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
