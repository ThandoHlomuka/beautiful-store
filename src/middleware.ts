import { auth } from "./auth";

export default auth((req) => {
    const user = req.auth?.user as any;
    const isLoggedIn = !!user;
    const isAdmin = user?.role === "ADMIN";
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
    const isOnLogin = req.nextUrl.pathname.startsWith("/login");

    if (isOnAdmin) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/login", req.nextUrl));
        }
        if (!isAdmin) {
            return Response.redirect(new URL("/", req.nextUrl));
        }
    }

    if (isOnLogin && isLoggedIn && isAdmin) {
        return Response.redirect(new URL("/admin", req.nextUrl));
    }
});

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
