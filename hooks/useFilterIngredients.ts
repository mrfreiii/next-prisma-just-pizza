import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
    setSelectedIngredients: (ids: string[]) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredients, {toggle}] = useSet(new Set<string>(values))

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

    const setSelectedIngredients = (ids: string[]) => {
        ids.forEach(selectedIngredients.add)
    }

    return {ingredients, onAddId: toggle, selectedIngredients, setSelectedIngredients};
}