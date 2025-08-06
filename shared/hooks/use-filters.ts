import { useMemo, useState } from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

type PricesType = {
    priceFrom?: number;
    priceTo?: number;
}

type QueryFiltersType = PricesType & {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export type FiltersType = {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PricesType;
}

type ReturnProps = FiltersType & {
    setPrices: (name: keyof PricesType, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFiltersType, string>;

    const [selectedIngredients, {toggle: toggleIngredients}] = useSet(new Set<string>(searchParams.get("ingredients")?.split(",")))
    const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : []))
    const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>(searchParams.get("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []))

    const [prices, setPrices] = useState<PricesType>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePrice = (name: keyof PricesType, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return useMemo(() => ({
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrices: updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients,
    }), [sizes, pizzaTypes, selectedIngredients, prices])
}