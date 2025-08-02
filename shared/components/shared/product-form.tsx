"use client";

import { FC } from "react";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { ProductWithRelationsType } from "@/@types/prisma";
import { ChoosePizzaForm } from "@/shared/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/shared/components/shared/choose-product-form";

type Props = {
    product: ProductWithRelationsType;
    onSuccessAction?: () => void;
}

export const ProductForm: FC<Props> = ({product, onSuccessAction}) => {
    const {addCartItem, loading} = useCartStore(state => state);

    const firstVariant = product.variants[0];
    const isPizzaForm = Boolean(firstVariant.pizzaType);

    const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
        const variantId = productVariantId ?? firstVariant.id;

        try {
            await addCartItem({
                productVariantId: variantId,
                ingredients,
            })

            toast.success(product.name + " добавлен в корзину")
            onSuccessAction && onSuccessAction();
        } catch (e) {
            toast.error("Не удалось добавить товар в корзину")
            console.error(e)
        }
    }

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                variants={product.variants}
                onSubmit={onSubmit}
                loading={loading}
            />
        )
    }

    return (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstVariant.price}
            onSubmit={onSubmit}
            loading={loading}
        />
    )
}