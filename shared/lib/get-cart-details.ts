import { CartStateItem } from "@/shared/store/cart";
import { CartDto } from "@/shared/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {
    console.log("data")
    console.log(data)
    const items: CartStateItem[] = data.items.map((item) => ({
        id: item.id,
        name: item.productVariant.product.name,
        quantity: item.quantity,
        imageUrl: item.productVariant.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        pizzaSize: item.productVariant.size,
        pizzaType: item.productVariant.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    }))

    return {
        totalAmount: data.totalAmount,
        items
    }
}