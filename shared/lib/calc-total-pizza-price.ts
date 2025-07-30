import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";

export const calcTotalPizzaPrice = (
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
    const pizzaPrice = variants.find((v) => v.pizzaType === type && v.size === size)?.price || 0;
    const ingredientsPrice = ingredients
        .filter((ing) => selectedIngredients.has(ing.id))
        .reduce((acc, ing) => acc + ing.price, 0)

    return pizzaPrice + ingredientsPrice;
}