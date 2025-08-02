"use client";

import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog, } from "@/shared/components/ui";
import { useRouter } from "next/navigation";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ProductWithRelationsType } from "@/@types/prisma";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SheetTitle } from "@/shared/components/ui/sheet";
import { ProductForm } from "@/shared/components/shared/product-form";

type Props = {
    product: ProductWithRelationsType;
    className?: string;
}

export const ChooseProductModal: FC<Props> = ({product, className}) => {
    const router = useRouter();

    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 min-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                <ProductForm product={product} onSuccessAction={() => router.back()}/>
            </DialogContent>
        </Dialog>
    )
}