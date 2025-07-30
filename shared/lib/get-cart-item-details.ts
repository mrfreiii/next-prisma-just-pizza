import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient } from "@prisma/client";
import { CartStateItem } from "@/shared/store/cart";

export const getCartItemDetails = (
    {
        pizzaType,
        pizzaSize,
        ingredients,
    }:{
        pizzaType: PizzaType;
        pizzaSize: PizzaSize;
        ingredients: CartStateItem["ingredients"];
    }): string => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
}