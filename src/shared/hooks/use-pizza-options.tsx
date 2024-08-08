import { PizzaSize, PizzaType } from '@/shared/constans/pizza';
import React from 'react';
import { Variant } from '../components/shared/group-variants';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '@/shared/lib/get-available-pizza-sizes';
import { ProductVariant } from '@prisma/client';

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    currentVariantId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const availableSizes = getAvailablePizzaSizes(type, variants);

    const currentVariantId = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.id;

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (variant) => Number(variant.value) === size && !variant.disabled,
        );
        const availableSize = availableSizes?.find((variant) => !variant.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [availableSizes, size, type]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentVariantId,
        setSize,
        setType,
        addIngredient,
    };
};