import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ing) => acc + ing.price, 0);

    return (ingredientsPrice + item.productVariant.price) * item.quantity;
}