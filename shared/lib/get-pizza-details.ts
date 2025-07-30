import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { calcTotalPizzaPrice } from "@/shared/lib/calc-total-pizza-price";
import { Ingredient, ProductVariant } from "@prisma/client";

export const getPizzaDetails = (
    {
        type,
        size,
        variants,
        ingredients,
        selectedIngredients,
    }: {
        type: PizzaType,
        size: PizzaSize,
        variants: ProductVariant[],
        ingredients: Ingredient[],
        selectedIngredients: Set<number>,
    }) => {
    const textDetails = `${size}см, ${mapPizzaType[type]} тесто`;

    const totalPrice = calcTotalPizzaPrice({
        type,
        size,
        variants,
        ingredients,
        selectedIngredients
    });

    return { totalPrice, textDetails };
}