import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

const generateProductVariant = ({
    productId,
    pizzaType,
    size,
    price
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
    price: number;
}) => {
    return {
        productId,
        price,
        pizzaType,
        size,
    } as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('99', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('99', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ]
    })

    await prisma.category.createMany({
        data: categories,
    })

    await prisma.ingredient.createMany({
        data: ingredients
    })

    await prisma.product.createMany({
        data: products
    })

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Meat Pizza',
            imageUrl:
                '/assets/images/categories/pizzas/meat-pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(7, 15),
            },
        },
    })

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Julien Pizza',
            imageUrl:
                '/assets/images/categories/pizzas/julien-pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Ham and Cheese',
            imageUrl:
                '/assets/images/categories/pizzas/ham-and-cheese.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 15),
            },
        },
    });

    const pizza4 = await prisma.product.create({
        data: {
            name: 'Chorizo Fresh',
            imageUrl:
                '/assets/images/categories/pizzas/chorizo-fresh.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(7, 13),
            },
        },
    });

    const pizza5 = await prisma.product.create({
        data: {
            name: 'Pepperoni',
            imageUrl:
                '/assets/images/categories/pizzas/pepperoni.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza6 = await prisma.product.create({
        data: {
            name: 'Cheese Pizza',
            imageUrl:
                '/assets/images/categories/pizzas/cheese-pizza.png',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    await prisma.productVariant.createMany({
        data: [
            // Meat Pizza
            generateProductVariant({ productId: pizza1.id, pizzaType: 1, size: 20, price: 17 }),
            generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 30, price: 24 }),
            generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 40, price: 32 }),

            // Julien Pizza
            generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 20, price: 15 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 30, price: 25 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 40, price: 37 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 20, price: 14 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 30, price: 24 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 40, price: 34 }),

            // Ham and Cheese
            generateProductVariant({ productId: pizza3.id, pizzaType: 1, size: 20, price: 17 }),
            generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 30, price: 24 }),
            generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 40, price: 32 }),

            // Chorizo Fresh
            generateProductVariant({ productId: pizza4.id, pizzaType: 1, size: 20, price: 16 }),
            generateProductVariant({ productId: pizza4.id, pizzaType: 1, size: 30, price: 26 }),
            generateProductVariant({ productId: pizza4.id, pizzaType: 1, size: 40, price: 37 }),
            generateProductVariant({ productId: pizza4.id, pizzaType: 2, size: 20, price: 14 }),
            generateProductVariant({ productId: pizza4.id, pizzaType: 2, size: 30, price: 24 }),
            generateProductVariant({ productId: pizza4.id, pizzaType: 2, size: 40, price: 34 }),

            // Pepperoni
            generateProductVariant({ productId: pizza5.id, pizzaType: 1, size: 20, price: 18 }),
            generateProductVariant({ productId: pizza5.id, pizzaType: 2, size: 30, price: 27 }),
            generateProductVariant({ productId: pizza5.id, pizzaType: 2, size: 40, price: 34 }),

            // Cheese Pizza
            generateProductVariant({ productId: pizza6.id, pizzaType: 1, size: 20, price: 15 }),
            generateProductVariant({ productId: pizza6.id, pizzaType: 1, size: 30, price: 25 }),
            generateProductVariant({ productId: pizza6.id, pizzaType: 1, size: 40, price: 37 }),
            generateProductVariant({ productId: pizza6.id, pizzaType: 2, size: 20, price: 14 }),
            generateProductVariant({ productId: pizza6.id, pizzaType: 2, size: 30, price: 24 }),
            generateProductVariant({ productId: pizza6.id, pizzaType: 2, size: 40, price: 34 }),


            // Other Products
            generateProductVariant({ productId: 1, price: 2 }),
            generateProductVariant({ productId: 2, price: 12 }),
            generateProductVariant({ productId: 3, price: 4 }),
            generateProductVariant({ productId: 4, price: 14 }),
            generateProductVariant({ productId: 5, price: 18 }),
            generateProductVariant({ productId: 6, price: 11 }),
            generateProductVariant({ productId: 7, price: 17 }),
            generateProductVariant({ productId: 8, price: 15 }),
            generateProductVariant({ productId: 9, price: 12 }),
            generateProductVariant({ productId: 10, price: 12 }),
            generateProductVariant({ productId: 11, price: 16 }),
            generateProductVariant({ productId: 12, price: 10 }),
            generateProductVariant({ productId: 13, price: 12 }),
            generateProductVariant({ productId: 14, price: 14 }),
        ],
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '99',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '222222',
            }
        ]
    })

    await prisma.cartItem.create({
        data:
        {
            cartId: 1,
            productVariantId: 1,
            quantity: 1,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 },],
            },
        }
    })

    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                    '/assets/images/stories/1/client-favorites.png',
            },
            {
                previewImageUrl:
                    '/assets/images/stories/2/client-testimonials.png',
            },
            {
                previewImageUrl:
                    '/assets/images/stories/3/meet-the-team.png',
            },
            {
                previewImageUrl:
                    '/assets/images/stories/4/behind-the-scenes.png',
            },
            {
                previewImageUrl:
                    '/assets/images/stories/5/office-life.png',
            },
            {
                previewImageUrl:
                    '/assets/images/stories/6/fun-facts-about-us.png',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                    'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
            },
        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(e => {
        throw e
    })
