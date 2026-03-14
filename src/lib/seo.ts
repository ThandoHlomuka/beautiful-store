import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Beautiful Store",
  description: "Discover curated, premium products with a beautiful shopping experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://beautiful-store.vercel.app",
  twitter: "@beautifulstore",
  ogImage: "/og-image.png",
  keywords: [
    "online store",
    "premium products",
    "shopping",
    "e-commerce",
    "beautiful store",
    "curated products",
    "quality goods",
  ],
  author: "Beautiful Store",
  creator: "Beautiful Store",
  publisher: "Beautiful Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;

interface PageSEO {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Generate comprehensive metadata for any page
 */
export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  noIndex,
}: PageSEO): Metadata {
  const fullTitle = `${title} — ${SITE_CONFIG.name}`;
  const imageUrl = ogImage || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title: {
      default: fullTitle,
      template: `%s — ${SITE_CONFIG.name}`,
    },
    description,
    keywords: keywords ? [...keywords, ...SITE_CONFIG.keywords] : SITE_CONFIG.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonical || SITE_CONFIG.url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical || SITE_CONFIG.url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitter,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : SITE_CONFIG.robots,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: SITE_CONFIG.name,
    },
  };
}

/**
 * Generate product-specific metadata for e-commerce SEO
 */
export interface ProductSEO {
  id: string;
  title: string;
  description: string;
  price: number;
  imageBase64?: string | null;
  inStock?: boolean;
}

export function generateProductMetadata(product: ProductSEO): Metadata {
  const productUrl = `${SITE_CONFIG.url}/products/${product.id}`;
  const imageUrl = product.imageBase64 || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title: {
      default: `${product.title} — ${SITE_CONFIG.name}`,
      template: `%s — ${SITE_CONFIG.name}`,
    },
    description: product.description,
    keywords: [
      product.title.toLowerCase(),
      "buy " + product.title.toLowerCase(),
      product.title.toLowerCase() + " price",
      "premium " + product.title.toLowerCase(),
      ...SITE_CONFIG.keywords,
    ],
    openGraph: {
      type: "product",
      locale: "en_US",
      url: productUrl,
      title: `${product.title} — ${SITE_CONFIG.name}`,
      description: product.description,
      siteName: SITE_CONFIG.name,
      product: {
        name: product.title,
        description: product.description,
        price: {
          amount: product.price,
          currency: "USD",
        },
        availability: product.inStock ? "in stock" : "out of stock",
      },
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — ${SITE_CONFIG.name}`,
      description: product.description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitter,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for enhanced Google search results
 */
export function generateStructuredData(type: "website" | "product" | "organization" | "breadcrumb", data: any): string {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case "website":
      structuredData["@type"] = "WebSite";
      structuredData.name = SITE_CONFIG.name;
      structuredData.description = SITE_CONFIG.description;
      structuredData.url = SITE_CONFIG.url;
      structuredData.potentialAction = {
        "@type": "SearchAction",
        target: `${SITE_CONFIG.url}/products?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      };
      break;

    case "product":
      structuredData["@type"] = "Product";
      structuredData.name = data.name;
      structuredData.description = data.description;
      structuredData.image = data.image || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;
      structuredData.sku = data.id;
      structuredData.offers = {
        "@type": "Offer",
        price: data.price,
        priceCurrency: "USD",
        availability: data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: `${SITE_CONFIG.url}/products/${data.id}`,
      };
      structuredData.brand = {
        "@type": "Brand",
        name: SITE_CONFIG.name,
      };
      break;

    case "organization":
      structuredData["@type"] = "Organization";
      structuredData.name = SITE_CONFIG.name;
      structuredData.url = SITE_CONFIG.url;
      structuredData.logo = `${SITE_CONFIG.url}/logo.png`;
      structuredData.sameAs = [
        "https://twitter.com/beautifulstore",
        "https://facebook.com/beautifulstore",
        "https://instagram.com/beautifulstore",
      ];
      structuredData.contactPoint = {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@beautifulstore.com",
      };
      break;

    case "breadcrumb":
      structuredData["@type"] = "BreadcrumbList";
      structuredData.itemListElement = data.items.map((item: { name: string; position: number; item: string }, index: number) => ({
        "@type": "ListItem",
        position: item.position || index + 1,
        name: item.name,
        item: item.item,
      }));
      break;
  }

  return JSON.stringify(structuredData);
}

/**
 * Generate breadcrumb structured data helper
 */
export function generateBreadcrumbData(items: Array<{ name: string; item: string }>): string {
  return generateStructuredData("breadcrumb", { items });
}
