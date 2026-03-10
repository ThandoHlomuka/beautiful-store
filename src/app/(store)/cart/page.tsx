"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-empty">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven&apos;t added anything yet.</p>
                    <Link href="/products" className="action-button primary">
                        Start Shopping &rarr;
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Shopping Cart ({totalItems} items)</h1>

            {items.map((item) => (
                <div key={item.id} className="cart-item">
                    <div
                        className="cart-item-image"
                        style={
                            item.imageBase64
                                ? { backgroundImage: `url(${item.imageBase64})` }
                                : {}
                        }
                    />
                    <div className="cart-item-info">
                        <p className="cart-item-title">{item.title}</p>
                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            &minus;
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                        </button>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeItem(item.id)}>
                        Remove
                    </button>
                </div>
            ))}

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Items</span>
                    <span>{totalItems}</span>
                </div>
                <div className="summary-total">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout &rarr;</button>
            </div>
        </div>
    );
}
