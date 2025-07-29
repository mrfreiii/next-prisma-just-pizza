import { axiosInstance } from "@/shared/services/instance";
import { Ingredient, Product } from "@prisma/client";
import { ApiRoutes } from "@/shared/services/constants";

export const getAll = async (): Promise<Ingredient[]> => {
    const {data} = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

    return data;
}