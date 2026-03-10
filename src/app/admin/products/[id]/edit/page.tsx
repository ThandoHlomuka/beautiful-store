import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) return notFound();

    return (
        <div className="admin-page">
            <header className="admin-header">
                <h1>Edit Product</h1>
                <p className="subtitle">Modify the details of &ldquo;{product.title}&rdquo;</p>
            </header>
            <ProductForm product={product} />
        </div>
    );
}
