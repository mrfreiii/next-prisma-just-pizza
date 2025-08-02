import { CartState, useCartStore } from "@/shared/store/cart";
import { useEffect } from "react";

export const useCart = (): CartState => {
    const cartState = useCartStore(state => state)

    useEffect(() => {
        cartState.fetchCartItems()
    }, [])

    return cartState;
}