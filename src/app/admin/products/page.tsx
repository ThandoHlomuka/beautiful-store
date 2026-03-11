import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageBase64: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
    try {
        const products = (await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        })) as Product[];

        return (
            <div className="admin-page">
                <header className="admin-header space-between">
                    <div>
                        <h1>Products Inventory</h1>
                        <p className="subtitle">Manage everything you sell</p>
                    </div>
                    <Link href="/admin/products/new" className="action-button primary">
                        + Add New Product
                    </Link>
                </header>

                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        No products found. Start by adding one.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            {product.imageBase64 ? (
                                                <div
                                                    className="table-img"
                                                    style={{ backgroundImage: `url(${product.imageBase64})` }}
                                                />
                                            ) : (
                                                <div className="table-placeholder-img">No Img</div>
                                            )}
                                        </td>
                                        <td className="font-medium">{product.title}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.createdAt.toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-link"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch admin products:", error);
        throw error;
    }
}
