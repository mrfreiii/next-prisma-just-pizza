"use client";

import { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use"

import { cn } from "@/lib/utils";
import { Title } from "@/components/shared/title";
import { ProductCard } from "@/components/shared/product-card";
import { useCategoryStore } from "@/store/category";

type Props = {
    title: string;
    categoryId: number;
    // eslint-disable-next-line
    items: any[];
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
                        price={item.items[0].price}
                    />
                ))}
            </div>
        </div>
    )
}