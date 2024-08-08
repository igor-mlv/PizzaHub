'use client';

import React from 'react';
import { Ingredient, ProductVariant } from '@prisma/client';
import { PizzaImage, Title, GroupVariants, IngredientItem } from '.';
import { Button } from '../ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constans/pizza';
import { cn } from '@/shared/lib/utils';
import { getPizzaDetails } from '@/shared/lib/get-pizza-details';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    variants: ProductVariant[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,
    variants,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className,
}) => {
    const {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentVariantId,
        setSize,
        setType,
        addIngredient,
    } = usePizzaOptions(variants);

    const { totalPrice, textDetaills } = getPizzaDetails(
        type,
        size,
        variants,
        ingredients,
        selectedIngredients,
    );

    const handleClickAdd = () => {
        if (currentVariantId) {
            onSubmit(currentVariantId, Array.from(selectedIngredients));
        }
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <div className="flex flex-col gap-4 mt-5">
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

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    loading={loading}
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart for {totalPrice} $
                </Button>
            </div>
        </div>
    );
};