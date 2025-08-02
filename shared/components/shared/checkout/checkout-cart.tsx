import { FC } from "react";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { CheckoutItem } from "@/shared/components/shared/checkout-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/store/cart";
import { CheckoutItemSkeleton } from "@/shared/components/shared/cart-item-skeleton";

type Props = {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: FC<Props> = ({
                                            items,
                                            onClickCountButton,
                                            removeCartItem,
                                            loading,
                                            className
                                        }) => {
    return (
        <WhiteBlock title={"1. Корзина"} className={className}>
            <div className={"flex flex-col gap-5"}>
                {
                    loading ? (
                        [...Array(4).fill({})].map((_, index) => (
                            <CheckoutItemSkeleton key={index}/>
                        ))
                    ) : (
                        items.map((item) => (
                            <CheckoutItem
                                key={item.id}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={getCartItemDetails({
                                    pizzaType: item.pizzaType as PizzaType,
                                    pizzaSize: item.pizzaSize as PizzaSize,
                                    ingredients: item.ingredients
                                })}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                disabled={item.disabled}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={() => removeCartItem(item.id)}
                            />
                        ))
                    )
                }
            </div>
        </WhiteBlock>
    )
}