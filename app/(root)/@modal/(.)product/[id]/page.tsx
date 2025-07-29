import { notFound } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";
import { ChooseProductModal } from "@/shared/components/shared/modals/choose-product-modal";

export default async function ProductModalPage({params}: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params;

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            ingredients: true,
            variants: true
        }
    });

    if (!product) {
        return notFound()
    }

    return (
        <ChooseProductModal product={product}/>
    )
}