import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="section" style={{ paddingTop: "100px" }}>
            <h1 className="section-title">All Products</h1>
            <p className="section-subtitle">Browse our complete collection.</p>

            {products.length === 0 ? (
                <div className="cart-empty">
                    <h2>No products yet</h2>
                    <p>Check back soon — we&apos;re adding new items daily.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product, i) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="product-card animate-in"
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            {product.imageBase64 ? (
                                <div
                                    className="card-image"
                                    style={{ backgroundImage: `url(${product.imageBase64})` }}
                                />
                            ) : (
                                <div className="card-placeholder">No Image</div>
                            )}
                            <div className="card-body">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-desc">{product.description}</p>
                                <div className="card-footer">
                                    <span className="card-price">${product.price.toFixed(2)}</span>
                                    <span className="card-btn">View &rarr;</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
