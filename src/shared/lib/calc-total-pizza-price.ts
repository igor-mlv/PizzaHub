
import { Ingredient, ProductVariant } from '@prisma/client';
import { PizzaSize, PizzaType } from '@/shared/constans/pizza';

/**
 * Function to calculate the total cost of a pizza
 *
 * @param type - the crust type of the selected pizza
 * @param size - the size of the selected pizza
 * @param variants - the list of variants
 * @param ingredients - the list of ingredients
 * @param selectedIngredients - the selected ingredients
 *
 * @returns number the total cost
 */
export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    variants: ProductVariant[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const pizzaPrice =
        variants.find((variant) => variant.pizzaType === type && variant.size === size)?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};
