"use client";

import { FC } from "react";
import { cn } from "@/shared/lib/utils";

export type VariantType = {
    name: string;
    value: string;
    disabled?: boolean;
}

type Props = {
    items: readonly VariantType[];
    onClick?: (value: VariantType['value']) => void;
    value?: VariantType['value'];
    className?: string;
}

export const GroupVariants: FC<Props> = ({items, value, onClick, className})=>{
    return (
        <div className={cn("flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none", className)}>
            {
                items.map((item)=>(
                    <button
                        key={item.name}
                        onClick={()=>onClick?.(item.value)}
                        className={cn(
                            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
                            {
                                "bg-white shadow": item.value === value,
                                "text-gray-500 opacity-50 pointer-events-none": item.disabled
                            }
                        )}
                    >
                        {item.name}
                    </button>
                ))
            }
        </div>
    )
}