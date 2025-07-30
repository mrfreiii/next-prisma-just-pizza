import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "@/shared/components/shared/pizza-image";
import { Title } from "@/shared/components/shared/title";
import { Button } from "@/shared/components/ui";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";
import { IngredientItem } from "@/shared/components/shared/ingredient-item";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";

type Props = {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    variants: ProductVariant[];
    onClickAddCart?: () => void;
    className?: string;
}

export const ChoosePizzaForm: FC<Props> = (
    {
        imageUrl,
        name,
        ingredients,
        variants,
        onClickAddCart,
        className
    }) => {
    const {
        size,
        type,
        availableSizes,
        selectedIngredients,
        setSize,
        setType,
        addIngredient
    } = usePizzaOptions({variants});

    const {textDetails, totalPrice} = getPizzaDetails({
        type,
        size,
        variants,
        ingredients,
        selectedIngredients
    });


    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size}/>

            <div className={"w-[490px] bg-[#f7f6f5] p-7"}>
                <Title text={name} size={"md"} className={"font-extrabold mb-1"}/>

                <p className={"text-gray-400"}>{textDetails}</p>

                <div className={"flex flex-col gap-4 mt-5"}>
                    <GroupVariants
                        items={availableSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div
                    className={"bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5"}>
                    <div className={"grid grid-cols-3 gap-3"}>
                        {ingredients.map((ing) => (
                            <IngredientItem
                                key={ing.id}
                                name={ing.name}
                                price={ing.price}
                                imageUrl={ing.imageUrl}
                                onClick={() => addIngredient(ing.id)}
                                active={selectedIngredients.has(ing.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    className={"h-[55px] px-10 text-base rounded-[18px] w-full mt-10"}>
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}