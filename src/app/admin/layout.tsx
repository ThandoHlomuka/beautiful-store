import Link from "next/link";
import { ReactNode } from "react";
import { signOut } from "@/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Store Admin</h2>
                </div>
                <nav className="admin-nav">
                    <Link href="/admin" className="admin-nav-link">
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="admin-nav-link">
                        Products
                    </Link>
                    <Link href="/admin/orders" className="admin-nav-link">
                        Orders
                    </Link>
                    <Link href="/" className="admin-nav-link storefront-link">
                        View Storefront &rarr;
                    </Link>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}
                    >
                        <button type="submit" className="admin-nav-link logout-button">
                            Sign Out
                        </button>
                    </form>
                </nav>
            </aside>
            <main className="admin-content">{children}</main>
        </div>
    );
}
