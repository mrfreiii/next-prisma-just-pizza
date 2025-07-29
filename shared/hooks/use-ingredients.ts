import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/shared/services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        (async () => {
                try {
                    const res: Ingredient[] = await Api.ingredients.getAll();
                    setIngredients(res);
                } catch (e) {
                    console.error(e)
                }
            }
        )()
    }, [])

    return {ingredients};
}