import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { AdminProvider } from "@/context/AdminContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import UpdateNotifier from "@/components/UpdateNotifier";

export const metadata: Metadata = {
  title: {
    default: "Metra Marketplace - Premium Online Shopping",
    template: "%s | Metra Marketplace",
  },
  description: "Discover amazing products at great prices - Your premier online shopping destination",
  keywords: ["online shopping", "premium products", "electronics", "clothing", "beauty", "marketplace"],
  authors: [{ name: "Thando Hlomuka" }],
  creator: "Thando Hlomuka",
  metadataBase: new URL("https://metramarketplace.com"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Metra Marketplace",
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
  themeColor: "#6366f1",
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
      <body className="antialiased light">
        <ErrorBoundary>
          <AuthProvider>
            <CurrencyProvider>
              <AdminProvider>
                <ProductProvider>
                  <CartProvider>
                    <ChatProvider>
                      {children}
                      <UpdateNotifier />
                    </ChatProvider>
                  </CartProvider>
                </ProductProvider>
              </AdminProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}