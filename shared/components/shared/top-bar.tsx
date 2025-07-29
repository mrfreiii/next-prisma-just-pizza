import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Categories } from "@/shared/components/shared/categories";
import { SortPopup } from "@/shared/components/shared/sort-popup";
import { Container } from "@/shared/components/shared/container";
import { Category } from "@prisma/client";

type Props = {
    categories: Category[];
    className?: string;
}

export const TopBar: FC<Props> = ({categories, className}) => {
    return (
        <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
            <Container className={"flex items-center justify-between"}>
                <Categories categories={categories}/>
                <SortPopup/>
            </Container>
        </div>
    )
}