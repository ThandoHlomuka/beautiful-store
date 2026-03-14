import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Generate dynamic sitemap.xml for Google indexing
 * This automatically includes all products and static pages
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beautiful-store.vercel.app";

  // Static pages that should always be indexed
  const staticPages = [
    { path: "", lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { path: "products", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { path: "login", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { path: "signup", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { path: "profile", lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { path: "cart", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  // Fetch all products for dynamic product pages
  let productPages: Array<{ path: string; lastModified: Date; changeFrequency: string; priority: number }> = [];

  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    productPages = products.map((product) => ({
      path: `products/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  // Combine all pages
  const allPages = [...staticPages, ...productPages];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${page.lastModified.toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
