"use client"

import { ChangeEvent, FC, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { FilterCheckbox, FilterCheckboxProps } from "@/shared/components/shared/filter-checkbox";
import { Input, Skeleton } from "@/shared/components/ui";

type ItemType = FilterCheckboxProps;

type Props = {
    title: string;
    name: string;
    items: ItemType[];
    defaultItems?: ItemType[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selectedValues?: Set<string>;
    className?: string;
}

export const CheckboxFiltersGroup: FC<Props> = (
    {
        title,
        name,
        items,
        defaultItems,
        limit = 5,
        loading,
        searchInputPlaceholder = "Поиск...",
        onClickCheckbox,
        defaultValue,
        selectedValues,
        className
    }) => {
    const [showAll, setShowAll] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")

    if (loading) {
        return (
            <div className={className}>
                <p className={"font-bold mb-3"}>{title}</p>

                {
                    ...Array(limit)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} className={"h-6 mb-4 rounded-[8px]"}/>
                        ))
                }

                <Skeleton className={"w-28 h-6 rounded-[8px]"}/>
            </div>
        )
    }

    const list = showAll
        ? items.filter((i) => i.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items)?.slice(0, limit);

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    return (
        <div className={cn("", className)}>
            <p className={"font-bold mb-3"}>{title}</p>

            {showAll && (
                <div className={"mb-5"}>
                    <Input placeholder={searchInputPlaceholder}
                           onChange={onChangeSearchInput}
                           className={"bg-gray-50 border-none"}/>
                </div>)
            }

            <div className={"flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar"}>
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        name={name}
                        endAdornment={item.endAdornment}
                        checked={selectedValues?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={"text-primary mt-3 cursor-pointer"}
                    >
                        {showAll ? "Скрыть" : "+ Показать все"}
                    </button>
                </div>
            )}
        </div>
    )
}