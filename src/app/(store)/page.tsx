import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
    const featuredProducts = await prisma.product.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Discover <span className="gradient-text">Premium</span> Products
                    </h1>
                    <p className="hero-subtitle">
                        Curated with care, crafted for those who appreciate the finer things.
                        Welcome to a new standard of online shopping.
                    </p>
                    <Link href="/products" className="hero-cta">
                        Shop Now &rarr;
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="section">
                    <h2 className="section-title">Latest Arrivals</h2>
                    <p className="section-subtitle">Fresh drops straight to your screen.</p>
                    <div className="product-grid">
                        {featuredProducts.map((product, i) => (
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
                </section>
            )}
        </>
    );
}
