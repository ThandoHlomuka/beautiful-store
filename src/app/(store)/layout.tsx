import { CartProvider } from "@/context/CartContext";
import StoreNav from "@/components/store/StoreNav";
import MobileNav from "@/components/store/MobileNav";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            <StoreNav />
            <main>{children}</main>
            <MobileNav />
            <footer className="store-footer">
                <p>&copy; {new Date().getFullYear()} LUXE Store. All rights reserved.</p>
            </footer>
        </CartProvider>
    );
}
