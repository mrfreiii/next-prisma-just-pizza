import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useSet } from "react-use";
import { ProductVariant } from "@prisma/client";
import { getAvailablePizzaSizes } from "@/shared/lib/get-available-pizza-sizes";
import { VariantType } from "@/shared/components/shared/group-variants";

type ReturnProps = {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    currentVariantId?: number;
    availableSizes: VariantType[];
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (
    {
        variants,
    }:{
        variants: ProductVariant[],
    }): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes({type, variants})

    const currentVariantId = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.id;

    useEffect(() => {
        const currentSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (!currentSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type])

    return {
        size,
        type,
        selectedIngredients,
        currentVariantId,
        availableSizes,
        setSize,
        setType,
        addIngredient,
    }
}