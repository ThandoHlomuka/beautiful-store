import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.email) {
            return new NextResponse(
                JSON.stringify({ error: "Unauthorized" }),
                { status: 401 }
            );
        }

        const { name } = await req.json();

        if (!name) {
            return new NextResponse(
                JSON.stringify({ error: "Name is required" }),
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: { name },
        });

        return NextResponse.json({
            user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
        });
    } catch (error) {
        console.error("Profile update error:", error);
        return new NextResponse(
            JSON.stringify({ error: "Something went wrong" }),
            { status: 500 }
        );
    }
}
