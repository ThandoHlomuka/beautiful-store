import { Metadata } from 'next';
import { Product } from '@/data/products';

export interface SEOPageConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  product?: Product;
}

const SITE_NAME = 'Metra Marketplace';
const SITE_URL = 'https://metramarketplace.com';

export function generateMetadata(config: SEOPageConfig): Metadata {
  const { title, description, keywords, image, url, type, price, currency, product } = config;
  
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullDescription = description || 'Discover amazing products at great prices on Metra Marketplace - Your premier online shopping destination in South Africa.';
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image || 'https://metramarketplace.com/og-image.jpg';

  const meta: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords || ['online shopping', 'South Africa', 'electronics', 'clothing', 'beauty', 'metra marketplace'],
    authors: [{ name: 'Thando Hlomuka' }],
    creator: 'Thando Hlomuka',
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: 'en_ZA',
      type: type || 'website',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': fullUrl,
        'en-ZA': fullUrl,
      },
    },
  };

  if (price && currency) {
    return {
      ...meta,
      openGraph: {
        ...meta.openGraph,
        price: {
          amount: price,
          currency: currency,
        },
      },
    };
  }

  return meta;
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0] || product.image,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Metra Marketplace',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: 'ZAR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Metra Marketplace',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Your premier online shopping destination in South Africa',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Thando Hlomuka',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-12-345-6789',
      contactType: 'customer service',
      availableLanguage: ['English', 'Afrikaans'],
    },
    sameAs: [
      'https://facebook.com/metramarketplace',
      'https://instagram.com/metramarketplace',
      'https://twitter.com/metramarketplace',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export const seoConfig = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultTitle: 'Metra Marketplace - Premium Online Shopping',
  defaultDescription: 'Discover amazing products at great prices on Metra Marketplace - Your premier online shopping destination in South Africa',
  defaultImage: 'https://metramarketplace.com/og-image.jpg',
  twitterUsername: '@metramarketplace',
  keywords: [
    'online shopping',
    'South Africa',
    'ecommerce',
    'electronics',
    'clothing',
    'beauty',
    'sports',
    'books',
    'home and garden',
    'metra marketplace',
  ],
  localBusiness: {
    '@type': 'LocalBusiness',
    priceRange: '$$',
    currenciesAccepted: ['ZAR', 'USD'],
    paymentAccepted: ['Credit Card', 'PayFast', 'Cash'],
  },
};

export function generateSEOSitemap(products: Product[]) {
  const sitemapEntries = [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/products', changefreq: 'daily', priority: 0.9 },
    { loc: '/about', changefreq: 'monthly', priority: 0.7 },
    { loc: '/Support', changefreq: 'monthly', priority: 0.6 },
    ...products.map(product => ({
      loc: `/products/${product.id}`,
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: new Date().toISOString(),
    })),
  ];
  
  return sitemapEntries;
}