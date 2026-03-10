"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({
    product,
}: {
    product?: {
        id: string;
        title: string;
        description: string;
        price: number;
        imageBase64: string | null;
    };
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price?.toString() || "",
        imageBase64: product?.imageBase64 || "",
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageBase64: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = product ? `/api/products/${product.id}` : "/api/products";
            const method = product ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                alert("Operation failed.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!product || !confirm("Are you sure you want to delete this product?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/products/${product.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/admin/products");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Product Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g. Minimalist Watch"
                />
            </div>

            <div className="form-group">
                <label>Price ($)</label>
                <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="99.99"
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Detailed product information..."
                />
            </div>

            <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-container">
                    {formData.imageBase64 && (
                        <div
                            className="image-preview"
                            style={{ backgroundImage: `url(${formData.imageBase64})` }}
                        />
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <p className="help-text">JPG, PNG, WebP allowed.</p>
                </div>
            </div>

            <div className="form-actions form-actions-spaced">
                <button type="submit" className="action-button primary" disabled={loading}>
                    {loading ? "Saving..." : "Save Product"}
                </button>

                {product && (
                    <button
                        type="button"
                        className="action-button danger"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        Delete Product
                    </button>
                )}
            </div>
        </form>
    );
}
