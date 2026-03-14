import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO: Enable trailing slashes for better URL consistency
  trailingSlash: false,

  // SEO: Enable React strict mode for better development experience
  reactStrictMode: true,

  // SEO: Power preference for better performance
  poweredByHeader: false,

  // SEO: Compress responses for faster page loads
  compress: true,

  // SEO: Optimize images for better Core Web Vitals
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // SEO: Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // SEO: Redirects for clean URLs
  async redirects() {
    return [
      // Redirect old cart URL to new cart URL if needed
      // Example: { source: "/shop/:path*", destination: "/products/:path*", permanent: true }
    ];
  },
};

export default nextConfig;
