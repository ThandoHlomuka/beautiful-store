"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function MobileNav() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const isAdmin = (session?.user as any)?.role === "ADMIN";

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Shop", href: "/products", icon: ShoppingBag },
        { name: "Cart", href: "/cart", icon: ShoppingCart },
        ...(isAdmin ? [{ name: "Admin", href: "/admin", icon: User }] : []),
    ];

    return (
        <nav className="mobile-nav">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`mobile-nav-item ${isActive ? "active" : ""}`}
                    >
                        <Icon size={20} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
