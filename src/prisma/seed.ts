import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductVariant = ({
    productId,
    pizzaType,
    size,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    return {
        productId,
        price: randomDecimalNumber(20, 99),
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
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
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
            name: 'Pepperoni',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    })

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Cheese Pizza',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Chorizo Fresh',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 15),
            },
        },
    });

    await prisma.productVariant.createMany({
        data: [
            // Pepperoni
            generateProductVariant({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            // Cheese Pizza
            generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            // Chorizo Fresh
            generateProductVariant({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            // Other Products
            generateProductVariant({ productId: 1 }),
            generateProductVariant({ productId: 2 }),
            generateProductVariant({ productId: 3 }),
            generateProductVariant({ productId: 4 }),
            generateProductVariant({ productId: 5 }),
            generateProductVariant({ productId: 6 }),
            generateProductVariant({ productId: 7 }),
            generateProductVariant({ productId: 8 }),
            generateProductVariant({ productId: 9 }),
            generateProductVariant({ productId: 10 }),
            generateProductVariant({ productId: 11 }),
            generateProductVariant({ productId: 12 }),
            generateProductVariant({ productId: 13 }),
            generateProductVariant({ productId: 14 }),
            generateProductVariant({ productId: 15 }),
            generateProductVariant({ productId: 16 }),
            generateProductVariant({ productId: 17 }),
        ],
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '111111',
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
                    'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
            },
            {
                previewImageUrl:
                    'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
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
