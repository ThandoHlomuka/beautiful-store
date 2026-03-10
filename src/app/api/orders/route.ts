import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { total, status } = body;

        const newOrder = await prisma.order.create({
            data: {
                total: parseFloat(total),
                status: status || "PENDING",
            },
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
