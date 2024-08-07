import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query") || "";

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive"
            },
        },
        // or by default take 6 first products from database
        take: 6,
    });
    return NextResponse.json(products);
}