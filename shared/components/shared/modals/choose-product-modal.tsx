"use client";

import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog, } from "@/shared/components/ui";
import { useRouter } from "next/navigation";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ProductWithRelationsType } from "@/@types/prisma";
import { ChooseProductForm } from "@/shared/components/shared/choose-product-form";
import { ChoosePizzaForm } from "@/shared/components/shared/choose-pizza-form";

type Props = {
    product: ProductWithRelationsType;
    className?: string;
}

export const ChooseProductModal: FC<Props> = ({product, className}) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.variants[0].pizzaType);

    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 min-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        variants={product.variants}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                    />
                )
                }
            </DialogContent>
        </Dialog>
    )
}