import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        GitHub,
        Google,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                return user;
            }
        })
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const user = auth?.user as any;
            const isLoggedIn = !!user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnProfile = nextUrl.pathname.startsWith("/profile");
            const isAdmin = user?.role === "ADMIN";

            if (isOnAdmin) {
                if (isLoggedIn && isAdmin) return true;
                return false;
            }
            if (isOnProfile) {
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            if (trigger === "update" && session?.user) {
                // Handle profile updates
                token.name = session.user.name;
                token.email = session.user.email;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
