import { FC } from "react";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { CheckoutItemDetail } from "@/shared/components/shared/checkout-item-detail";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "@/shared/components/ui";
import { load } from "next/dist/compiled/@edge-runtime/primitives/load";

const TAX = 15;
const DELIVERY_PRICE = 250;

type Props = {
    totalAmount: number;
    loading: boolean;
}

export const CheckoutSidebar: FC<Props> = ({totalAmount, loading}) => {
    const taxPrice = (totalAmount * TAX) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + taxPrice;

    return (
        <WhiteBlock className={"p-6 sticky top-4"}>
            <div className={"flex flex-col gap-1"}>
                <span className={"text-xl"}>ИТОГО:</span>

                {loading ?
                    (
                        <Skeleton className={"h-11 w-48"}/>
                    ) : (
                        <span className={"h-11 text-[34px] font-extrabold"}>
                            {totalPrice} ₽
                        </span>
                    )
                }
            </div>

            <CheckoutItemDetail
                title={
                    <div className={"flex items-center"}>
                        <Package size={18} className={"mr-2 text-gray-400"}/>
                        Стоимость товаров:
                    </div>
                }
                value={
                    loading
                        ? <Skeleton className={"h-6 w-16 rounded-[6px]"}/>
                        : `${totalAmount} ₽`
                }
            />

            <CheckoutItemDetail
                title={
                    <div className={"flex items-center"}>
                        <Percent size={18} className={"mr-2 text-gray-400"}/>
                        Налоги:
                    </div>
                }
                value={
                    loading
                        ? <Skeleton className={"h-6 w-16 rounded-[6px]"}/>
                        : `${taxPrice} ₽`
                }
            />

            <CheckoutItemDetail
                title={
                    <div className={"flex items-center"}>
                        <Truck size={18} className={"mr-2 text-gray-400"}/>
                        Доставка:
                    </div>
                }
                value={
                    loading
                        ? <Skeleton className={"h-6 w-16 rounded-[6px]"}/>
                        : `${DELIVERY_PRICE} ₽`
                }
            />

            <Button loading={loading} type={"submit"}
                    className={"w-full h-14 rounded-2xl mt-6 text-base font-bold"}>
                Перейти к оплате
                <ArrowRight className={"w-5 ml-2"}/>
            </Button>
        </WhiteBlock>
    )
}