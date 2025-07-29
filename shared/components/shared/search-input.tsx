"use client";

import { FC, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";

type Props = {
    className?: string;
}

export const SearchInput: FC<Props> = ({className}) => {
    const ref = useRef(null);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [focused, setFocused] = useState<boolean>(false);

    useClickAway(ref, () => {
        setFocused(false)
    })

    useDebounce(() => {
        (async () => {
                try {
                    const res = await Api.products.search(searchQuery)
                    setProducts(res);
                } catch (e) {
                    console.error(e)
                }
            }
        )()
    }, 250, [searchQuery])

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery("");
        setProducts([]);
    }

    return (
        <>
            {focused &&
                <div className={"fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"}/>}

            <div
                ref={ref}
                className={cn("flex rounded-2xl flex-1 justify-between relative h-11", className)}>
                <Search
                    className={"absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 z-31"}/>

                <input
                    type="text"
                    placeholder={"Найти пиццу..."}
                    className={"rounded-2xl outline-none w-full bg-gray-100 pl-11 z-30"}
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {products.length > 0 && (
                    <div
                        className={
                            cn("absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                                focused && "visible opacity-100 top-12"
                            )}
                    >
                        {products.map((p) => (
                            <Link
                                key={p.id}
                                href={`/product/${p.id}`}
                                className={"flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"}
                                onClick={onClickItem}
                            >
                                <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className={"rounded-sm h-8 w-8"}
                                />

                                <span>{p.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}