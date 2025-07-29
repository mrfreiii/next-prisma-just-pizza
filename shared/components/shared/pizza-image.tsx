import { FC } from "react";
import { cn } from "@/shared/lib/utils";

type Props = {
    imageUrl: string;
    size: 20 | 30 | 40;
    className?: string;
}

export const PizzaImage: FC<Props> = ({imageUrl, size, className})=>{
    return (
        <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
            <img
                src={imageUrl}
                alt="Product Image"
                className={cn("relative left-2 top-2 transition-all z-10 duration-300", {
                    'w-[300px] h-[300px]': size === 20,
                    'w-[400px] h-[400px]': size === 30,
                    'w-[500px] h-[500px]': size === 40,
                })}
            />

            <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[420px] h-[420px]"}/>
            <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]"}/>
        </div>
    )
}