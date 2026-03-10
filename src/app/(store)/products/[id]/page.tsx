import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/store/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) return notFound();

        return (
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
