"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function StoreNav() {
    const { totalItems } = useCart();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="store-nav">
            <Link href="/" className="logo">
                LUXE
            </Link>
            <ul className="nav-links">
                <li>
                    <Link href="/" className={isActive("/") ? "active" : ""}>Home</Link>
                </li>
                <li>
                    <Link href="/products" className={isActive("/products") ? "active" : ""}>Shop</Link>
                </li>
                <li>
                    <Link href="/cart" className={`cart-badge ${isActive("/cart") ? "active" : ""}`}>
                        Cart
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </Link>
                </li>
                <li>
                    <Link href="/admin" className={pathname.startsWith("/admin") ? "active" : ""}>Admin</Link>
                </li>
            </ul>
        </nav>
    );
}
