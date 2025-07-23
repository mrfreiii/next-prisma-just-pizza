"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useCategoryStore } from "@/store/category";

type Props = {
    categories: Category[];
    className?: string;
}

export const Categories: FC<Props> = ({categories, className}) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
        <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
            {
                categories.map((cat) => (
                    <a
                        key={cat.id}
                        className={cn(
                            "flex items-center font-bold h-11 rounded-2xl px-5",
                            categoryActiveId === cat.id && "bg-white shadow-md shadow-gray-200 text-primary"
                        )}
                        href={`/#${cat.name}`}
                    >
                        <button className={"cursor-pointer"}>{cat.name}</button>
                    </a>
                ))
            }
        </div>
    )
}