import { NextRequest, NextResponse } from "next/server";
import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import {
    OrderSuccessTemplate
} from "@/shared/components/shared/email-templates/order-success";
import { sendEmail } from "@/shared/lib/sendEmail";
import { ReactNode } from "react";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            },
        })

        if(!order){
            return NextResponse.json({ error: "Order not found" });
        }

        const isSucceeded = body.object.status === "succeeded";

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
            }
        })

        const items = JSON.parse(order?.items as string) as CartItemDTO[];

        if(isSucceeded){
            await sendEmail({
                to: order.email,
                subject: "Just Pizza / Ваш заказ успешно оформлен",
                template: OrderSuccessTemplate({
                    items,
                    orderId: order.id
                }) as ReactNode
            })
        }
    } catch (e){
        console.log("[Checkout Callback] Error:", e);
        return NextResponse.json({ error: "Server Error" });
    }
}