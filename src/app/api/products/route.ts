import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, price, imageBase64 } = body;

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                imageBase64,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
