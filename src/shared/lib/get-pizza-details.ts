import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductVariant } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaType } from '@/shared/constans/pizza';

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    variants: ProductVariant[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredients);
    const textDetaills = `${size} cm, ${mapPizzaType[type]} pizza`;

    return { totalPrice, textDetaills };
};