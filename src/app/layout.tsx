import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { AdminProvider } from "@/context/AdminContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: "LuxeStore - Premium Online Shopping",
    template: "%s | LuxeStore",
  },
  description: "Discover amazing products at great prices",
  keywords: ["online shopping", "premium products", "electronics", "clothing", "beauty"],
  authors: [{ name: "Thando Hlomuka" }],
  creator: "Thando Hlomuka",
  metadataBase: new URL("https://luxestore.com"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "LuxeStore",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <CurrencyProvider>
            <AdminProvider>
              <ProductProvider>
                <CartProvider>
                  {children}
                </CartProvider>
              </ProductProvider>
            </AdminProvider>
          </CurrencyProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}