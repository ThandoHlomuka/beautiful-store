"use client";

import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
    product: {
        id: string;
        title: string;
        price: number;
        imageBase64: string | null;
    };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart();

    return (
        <button
            className="detail-add-btn"
            onClick={() => addItem(product)}
        >
            Add to Cart
        </button>
    );
}
