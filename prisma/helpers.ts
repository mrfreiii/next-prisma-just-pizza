import { Prisma } from "@prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductItem = ({
                                 productId,
                                 pizzaType,
                                 size,
                             }: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size,
    } as Prisma.ProductVariantUncheckedCreateInput;
};
