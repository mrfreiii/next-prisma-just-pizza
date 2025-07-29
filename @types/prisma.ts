import { Ingredient, Product, ProductVariant } from "@prisma/client";

export type ProductWithRelationsType = Product & {
    variants: ProductVariant[];
    ingredients: Ingredient[];
}