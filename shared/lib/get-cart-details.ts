import { CartStateItem } from "@/shared/store/cart";
import { CartDto } from "@/shared/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        name: item.productVariant.product.name,
        quantity: item.quantity,
        imageUrl: item.productVariant.product.imageUrl,
        disabled: false,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.productVariant.size,
        pizzaType: item.productVariant.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    })) as CartStateItem[];

    return {
        totalAmount: data.totalAmount,
        items
    }
}