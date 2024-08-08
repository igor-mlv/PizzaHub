import { ProductVariant } from '@prisma/client';
import { PizzaType, pizzaSizes } from '@/shared/constans/pizza';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
    const filteredPizzasByType = variants.filter((variant) => variant.pizzaType === type);

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
    }));
};