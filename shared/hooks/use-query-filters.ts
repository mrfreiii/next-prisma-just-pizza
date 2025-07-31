import qs from "qs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiltersType } from "@/shared/hooks/use-filters";

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
    }, [query])
}