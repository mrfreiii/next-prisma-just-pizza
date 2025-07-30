import { ProductVariant } from "@prisma/client";
import { pizzaSizes, PizzaType } from "@/shared/constants/pizza";
import { VariantType } from "@/shared/components/shared/group-variants";

export const getAvailablePizzaSizes = (
    {
        type,
        variants,
    }:{
        type: PizzaType,
        variants: ProductVariant[],
    }): VariantType[] => {
    const filteredPizzasByType = variants.filter((v) => v.pizzaType === type);

   return pizzaSizes.map((pizzaSize) => ({
        name: pizzaSize.name,
        value: pizzaSize.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(pizzaSize.value))
    }));

}