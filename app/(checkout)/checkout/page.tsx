"use client";

import { Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks/use-cart";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { FormProvider, useForm } from "react-hook-form";
import { CheckoutCart } from "@/shared/components/shared/checkout/checkout-cart";
import {
    CheckoutPersonalInfo
} from "@/shared/components/shared/checkout/checkout-personal-info";
import { CheckoutAddress } from "@/shared/components/shared/checkout/checkout-address";
import {
    checkoutFormSchema, CheckoutFormValues
} from "@/shared/constants/checkout-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CheckoutPage() {
    const {totalAmount, items, loading, updateItemQuantity, removeCartItem} = useCart();

    const [submitting, setSubmitting] = useState<boolean>(false);

    const form = useForm<CheckoutFormValues>({
        shouldFocusError: false,
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        }
    })

    const onSubmit = async (data: CheckoutFormValues) => {
        setSubmitting(true);

        try {
            const url = await createOrder(data);

            toast.success('Заказ успешно оформлен! 📝 Переход на оплату...', {
                icon: '✅',
            });

            if (url) {
                location.href = url;
            }
        } catch (e) {
            console.error(e);
            setSubmitting(false);
            toast.error("Не удалось создать заказ", {
                icon: "❌",
            });
        }
    }

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Container className={"mt-10"}>
            <Title text={"Оформление заказа"}
                   className={"font-extrabold mb-8 text-[36px]"}/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"flex gap-10"}>
                        {/*Левая часть*/}
                        <div className={"flex flex-col gap-10 flex-1 mb-20"}>
                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />

                            <CheckoutPersonalInfo
                                className={loading ? "opacity-40 pointer-events-none" : ""}/>

                            <CheckoutAddress
                                className={loading ? "opacity-40 pointer-events-none" : ""}/>
                        </div>

                        {/*Правая часть*/}
                        <div className={"w-[450px]"}>
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}