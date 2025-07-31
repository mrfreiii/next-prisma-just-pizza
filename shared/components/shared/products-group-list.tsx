"use client";

import { useIntersection } from "react-use"
import { FC, useEffect, useRef } from "react";

import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared/title";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelationsType } from "@/@types/prisma";
import { ProductCard } from "@/shared/components/shared/product-card";

type Props = {
    title: string;
    categoryId: number;
    items: ProductWithRelationsType[];
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: FC<Props> = (
    {
        title,
        categoryId,
        items,
        className,
        listClassName,
    }
) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    })

    useEffect(()=>{
        if(intersection?.isIntersecting){
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting])

    return (
        <div className={cn("", className)} id={title} ref={intersectionRef} >
            <Title text={title} size={"lg"} className={"font-extrabold mb-5"}/>

            <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
                {items.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        price={item.variants[0].price}
                        ingredients={item.ingredients}
                    />
                ))}
            </div>
        </div>
    )
}