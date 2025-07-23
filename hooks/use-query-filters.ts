import { useEffect, useMemo, useState } from "react";
import qs from "qs";
import { FiltersType } from "@/hooks/use-filters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: FiltersType) => {
    const router = useRouter()

    const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
    }

    const query = qs.stringify(params, {
        arrayFormat: "comma"
    })

    useEffect(() => {
        router.push(`?${query}`, {
            scroll: false
        })
    }, [query, router])
}