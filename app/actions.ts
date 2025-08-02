"use server";

import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/shared/lib/sendEmail";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { ReactNode } from "react";
import { createPayment } from "@/shared/lib/create-payment";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = await cookies();
        const cartToken = cookieStore.get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productVariant: {
                            include: {
                                product: true,
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken,
            }
        })

        if (!userCart) {
            throw new Error("Cart not found");
        }

        if (userCart.totalAmount === 0) {
            throw new Error("Cart is empty");
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            }
        })

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0
            }
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: `Оплата заказа #${order.id}`,
        })

        if (!paymentData) {
            throw new Error("Payment data not found");
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id
            }
        })

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail({
            to: data.email,
            subject: `Just Pizza / Оплатите заказ #${order.id}`,
            template: PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl,
            }) as ReactNode
        })

        return paymentUrl;
    } catch (e) {
        console.error("[CreateOrder] Server error", e);
    }
}