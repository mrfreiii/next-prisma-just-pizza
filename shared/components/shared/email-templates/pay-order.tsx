import { FC } from "react";

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: FC<Props> = ({orderId, totalAmount, paymentUrl}) => {
    return (
        <div>
            <h1>Заказ #{orderId}</h1>

            <p>Оплатите заказ на сумму {totalAmount} ₽.
                Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.</p>
        </div>
    );
}