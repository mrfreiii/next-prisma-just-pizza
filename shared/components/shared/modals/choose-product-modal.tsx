"use client";

import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog, } from "@/shared/components/ui";
import { useRouter } from "next/navigation";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ProductWithRelationsType } from "@/@types/prisma";
import { ChooseProductForm } from "@/shared/components/shared/choose-product-form";
import { ChoosePizzaForm } from "@/shared/components/shared/choose-pizza-form";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SheetTitle } from "@/shared/components/ui/sheet";

type Props = {
    product: ProductWithRelationsType;
    className?: string;
}

export const ChooseProductModal: FC<Props> = ({product, className}) => {
    const router = useRouter();

    const firstVariant = product.variants[0];
    const isPizzaForm = Boolean(firstVariant.pizzaType);

    const {addCartItem, loading} = useCartStore(state => state);

    const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
        const variantId = productVariantId ?? firstVariant.id;

        try {
            await addCartItem({
                productVariantId: variantId,
                ingredients,
            })

            toast.success(product.name + " добавлен в корзину")
            router.back();
        } catch (e) {
            toast.error("Не удалось добавить товар в корзину")
            console.error(e)
        }
    }

    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 min-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                <VisuallyHidden>
                    <SheetTitle/>
                </VisuallyHidden>

                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        variants={product.variants}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={firstVariant.price}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                )
                }
            </DialogContent>
        </Dialog>
    )
}