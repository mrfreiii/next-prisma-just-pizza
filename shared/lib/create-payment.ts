import axios from "axios";
import { PaymentData } from "@/@types/yookassa";

type DetailsType = {
    amount: number;
    orderId: number;
    description: string;
}

export async function createPayment(details: DetailsType) {
    const {data} = await axios.post<PaymentData>("https://api.yookassa.ru/v3/payments", {
            amount: {
                value: details.amount,
                currency: "RUB",
            },
            capture: true,
            description: details.description,
            metadata: {
                order_id: details.orderId,
            },
            confirmation: {
                type: "redirect",
                return_url: process.env.NEXT_PUBLIC_YOOKASSA_CALLBACK_URL,
            }
        }, {
            auth: {
                username: process.env.NEXT_PUBLIC_YOOKASSA_STORE_ID as string,
                password: process.env.NEXT_PUBLIC_YOOKASSA_API_KEY as string,
            },
            headers: {
                "Content-Type": "application/json",
                "Idempotence-Key": Math.random().toString(36).substring(7),
            }
        }
    )

    return data;
}