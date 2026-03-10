"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function StoreNav() {
    const { totalItems } = useCart();

    return (
        <nav className="store-nav">
            <Link href="/" className="logo">
                LUXE
            </Link>
            <ul className="nav-links">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/products">Shop</Link>
                </li>
                <li>
                    <Link href="/cart" className="cart-badge">
                        Cart
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </Link>
                </li>
                <li>
                    <Link href="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    );
}
