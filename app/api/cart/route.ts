import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import crypto from "crypto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("cartToken")?.value;
        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        productVariant: {
                            include: {
                                product: true,
                            }
                        },
                        ingredients: true,
                    }
                },
            }
        })

        return NextResponse.json(userCart);
    } catch (e) {
        console.log("[CART_GET] Server error", e);
        return NextResponse.json({ message: "Не удалось получить корзину" }, { status: 500});
    }

}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get("cartToken")?.value;
        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        return NextResponse.json(userCart);
    } catch (e) {
        console.log("[CART_POST] Server error", e);
        return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500});
    }

}
