import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/store/AddToCartButton";
import { generateProductMetadata, generateStructuredData } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
        robots: { index: false, follow: false },
      };
    }

    return generateProductMetadata({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      imageBase64: product.imageBase64,
      inStock: true,
    });
  } catch (error) {
    console.error("Failed to generate product metadata:", error);
    return {
      title: "Product",
      description: "View product details",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return notFound();

    const productStructuredData = generateStructuredData("product", {
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.imageBase64,
      inStock: true,
    });

    const breadcrumbStructuredData = generateStructuredData("breadcrumb", {
      items: [
        { name: "Home", position: 1, item: "/" },
        { name: "Products", position: 2, item: "/products" },
        { name: product.title, position: 3, item: `/products/${product.id}` },
      ],
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: productStructuredData }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbStructuredData }}
        />
        <div className="product-detail">
        <Link href="/products" className="back-link">
          &larr; Back to Shop
        </Link>

        <div className="product-detail-grid">
          {product.imageBase64 ? (
            <div
              className="detail-image"
              style={{ backgroundImage: `url(${product.imageBase64})` }}
            />
          ) : (
            <div className="detail-placeholder">No Image Available</div>
          )}

          <div className="detail-info">
            <h1>{product.title}</h1>
            <p className="detail-price">${product.price.toFixed(2)}</p>
            <p className="detail-desc">{product.description}</p>
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                imageBase64: product.imageBase64,
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}
