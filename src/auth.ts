import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const user = auth?.user as any;
            const isLoggedIn = !!user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isAdmin = user?.role === "ADMIN";

            if (isOnAdmin) {
                if (isLoggedIn && isAdmin) return true;
                return false;
            }
            return true;
        },
        async session({ session, user, token }: any) {
            if (session.user) {
                // Fetch user from DB to get the role if not in token
                const dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email as string },
                    select: { role: true }
                });
                if (dbUser) {
                    (session.user as any).role = dbUser.role;
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
