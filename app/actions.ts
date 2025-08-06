"use server";

import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { sendEmail } from "@/shared/lib/sendEmail";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { ReactNode } from "react";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";
import {
    VerificationUserTemplate
} from "@/shared/components/shared/email-templates/verification-user";

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

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();
        if (!currentUser) {
            throw new Error("User not found");
        }

        const foundUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : foundUser?.password,
            }
        })

    } catch (err) {
        console.log("[UPDATE_USER], Error:", err)
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error("Почта не подтверждена");
            }

            throw new Error("Пользователь уже существует");
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail({
            to: createdUser.email,
            subject: "Just Pizza / Подтверждение регистрации",
            template: VerificationUserTemplate({
                code,
            }) as ReactNode
        });
    } catch (error) {
        console.log("Error [CREATE_USER]", error);
        throw error;
    }
}