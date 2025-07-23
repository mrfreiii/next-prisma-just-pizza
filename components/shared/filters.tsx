"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import { Input, RangeSlider } from "@/components/ui";
import { CheckboxFiltersGroup, Title } from "@/components/shared";
import { useIngredients, useQueryFilters, useFilters } from "@/hooks";

type Props = {
    className?: string;
}

export const Filters: FC<Props> = ({className}) => {
    const {ingredients} = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const mappedIngredients = ingredients.map((i) => ({
        value: String(i.id),
        text: i.name
    }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices("priceFrom", prices[0]);
        filters.setPrices("priceTo", prices[1]);
    }

    return (
        <div className={cn("", className)}>
            <Title text={"Фильтрация"} size={"sm"} className={"mb-5 font-bold"}/>

            {/*Фильтр типов пиц*/}
            <CheckboxFiltersGroup
                title={"Тип теста"}
                name={"pizzaTypes"}
                className={"mb-5"}
                onClickCheckbox={filters.setPizzaTypes}
                selectedValues={filters.pizzaTypes}
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
                onClickCheckbox={filters.setSizes}
                selectedValues={filters.sizes}
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
                        value={filters.prices.priceFrom}
                        onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
                    />
                    <Input
                        type={"number"}
                        placeholder={"1000"}
                        min={100}
                        max={1000}
                        value={filters.prices.priceTo}
                        onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                    onValueChange={updatePrices}
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
                onClickCheckbox={filters.setSelectedIngredients}
                selectedValues={filters.selectedIngredients}
            />
        </div>
    )
}