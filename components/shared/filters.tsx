"use client";

import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Title, CheckboxFiltersGroup } from "@/components/shared";
import { Input, RangeSlider } from "@/components/ui";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

type PricesType = {
    priceFrom?: number;
    priceTo?: number;
}

type QueryFilters = PricesType & {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

type Props = {
    className?: string;
}

export const Filters: FC<Props> = ({className}) => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const router = useRouter()

    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []))
    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []))
    const {ingredients, onAddId, selectedIngredients} = useFilterIngredients(searchParams.get("ingredients")?.split(","));

    const [prices, setPrices] = useState<PricesType>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const mappedIngredients = ingredients.map((i) => ({
        value: String(i.id),
        text: i.name
    }));

    const updatePrice = (name: keyof PricesType, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    console.log(searchParams, 999)

    useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients),
        }

        const query = qs.stringify(filters, {
            arrayFormat: "comma"
        })

        router.push(`?${query}`, {
            scroll: false
        })
    }, [pizzaTypes, sizes, prices, selectedIngredients])

    return (
        <div className={cn("", className)}>
            <Title text={"Фильтрация"} size={"sm"} className={"mb-5 font-bold"}/>

            {/*Фильтр типов пиц*/}
            <CheckboxFiltersGroup
                title={"Тип теста"}
                name={"pizzaTypes"}
                className={"mb-5"}
                onClickCheckbox={togglePizzaTypes}
                selectedValues={pizzaTypes}
                items={[
                    {text: "Тонкое", value: "1"},
                    {text: "Традиционное", value: "2"},
                ]}
            />

            {/*Фильтр размеров пиц*/}
            <CheckboxFiltersGroup
                title={"Размеры"}
                name={"sizes"}
                className={"mb-5"}
                onClickCheckbox={toggleSizes}
                selectedValues={sizes}
                items={[
                    {text: "20 см", value: "20"},
                    {text: "30 см", value: "30"},
                    {text: "40 см", value: "40"},
                ]}
            />

            {/*Фильтр цен*/}
            <div className={"mt-5 border-y border-y-neutral-100 py-6 pb-7"}>
                <p className={"font-bold mb-3"}>Цена от и до:</p>

                <div className={"flex gap-3 mb-5"}>
                    <Input
                        type={"number"}
                        placeholder={"0"}
                        min={0}
                        max={1000}
                        value={prices.priceFrom}
                        onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
                    />
                    <Input
                        type={"number"}
                        placeholder={"1000"}
                        min={100}
                        max={1000}
                        value={prices.priceTo}
                        onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[prices.priceFrom || 0, prices.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => setPrices({
                        priceFrom,
                        priceTo
                    })}
                />
            </div>

            {/*Фильтр ингридиентов*/}
            <CheckboxFiltersGroup
                title={"Ингредиенты"}
                name={"ingredients"}
                className={"mt-5"}
                limit={6}
                defaultItems={mappedIngredients.slice(0, 6)}
                items={mappedIngredients}
                loading={mappedIngredients.length < 1}
                onClickCheckbox={onAddId}
                selectedValues={selectedIngredients}
            />
        </div>
    )
}