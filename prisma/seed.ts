import { hashSync } from "bcrypt";

import { prisma } from "./prisma-client";
import { generateProductItem } from "./helpers";
import { seedCategories, seedIngredients, seedProducts } from "./constants";

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "User Test",
                email: "user@gmail.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "USER"
            },
            {
                fullName: "Admin Admin",
                email: "admin@gmail.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "ADMIN"
            }
        ]
    })

    await prisma.category.createMany({
        data: seedCategories,
    })

    await prisma.ingredient.createMany({
        data: seedIngredients,
    })

    await prisma.product.createMany({
        data: seedProducts,
    })

    const pizza1 = await prisma.product.create({
        data: {
            name: "Пепперони фреш",
            imageUrl: "images/pizzas/pepperoniFresh30.webp",
            categoryId: 1,
            ingredients: {
                connect: seedIngredients.slice(0, 5),
            }
        }
    })

    const pizza2 = await prisma.product.create({
        data: {
            name: "Сырная",
            imageUrl: "images/pizzas/cheese30.webp",
            categoryId: 1,
            ingredients: {
                connect: seedIngredients.slice(5, 10),
            }
        }
    })

    const pizza3 = await prisma.product.create({
        data: {
            name: "Чоризо фреш",
            imageUrl: "images/pizzas/chorizoFresh30.webp",
            categoryId: 1,
            ingredients: {
                connect: seedIngredients.slice(10, 40),
            }
        }
    })

    await prisma.productVariant.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40}),

            // Пицца "Сырная"
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40}),

            // Пицца "Чоризо фреш"
            generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40}),

            // Остальные продукты
            generateProductItem({productId: 1}),
            generateProductItem({productId: 2}),
            generateProductItem({productId: 3}),
            generateProductItem({productId: 4}),
            generateProductItem({productId: 5}),
            generateProductItem({productId: 6}),
            generateProductItem({productId: 7}),
            generateProductItem({productId: 8}),
            generateProductItem({productId: 9}),
            generateProductItem({productId: 10}),
            generateProductItem({productId: 11}),
            generateProductItem({productId: 12}),
            generateProductItem({productId: 13}),
            generateProductItem({productId: 14}),
            generateProductItem({productId: 15}),
            generateProductItem({productId: 16}),
            generateProductItem({productId: 17}),
        ]
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: "1111"
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "2222"
            }
        ]
    })

    await prisma.cartItem.create({
        data:
            {
                productVariantId: 1,
                cartId: 1,
                quantity: 2,
                ingredients: {
                    connect: [{id: 1}, {id: 2}, {id: 3}],
                }
            },

    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1)
})