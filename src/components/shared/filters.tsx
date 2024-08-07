"use client"
import React from 'react';
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from './';
import { Input } from '../ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}

export const Filters: React.FC<Props> = ({ className, }) => {
    const { ingredientsList, loading, onAddId, selectedIngredients } = useFilterIngredients();
    const ingredients = ingredientsList.map((ingredient) => ({ value: String(ingredient.id), text: ingredient.name }));

    const [selectedSizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
    const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));

    const [price, setPrice] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 100 });
    const updatePrice = (name: keyof PriceProps, userInput: number) => {
        //check if user input bigger then max price
        const value = userInput > 100 ? 100 : userInput;
        setPrice({
            ...price,
            [name]: value,
        })
    }

    React.useEffect(() => {
        const filters = {
            ...price,
            pizzaTypes: Array.from(selectedPizzaTypes),
            sizes: Array.from(selectedSizes),
            ingredients: Array.from(selectedIngredients)
        }
    }, [price, selectedSizes, selectedPizzaTypes, selectedIngredients])

    return (
        <div className={className}>
            <CheckboxFiltersGroup
                title="Piza Type"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={togglePizzaTypes}
                selected={selectedPizzaTypes}
                items={[
                    { text: 'Thin', value: '1' },
                    { text: 'Traditional', value: '2' },
                ]}
            />

            {/* Custom, new chekboxes */}
            <CheckboxFiltersGroup
                title={'Sizes'}
                name='sizes'
                className='mb-5'
                onClickCheckbox={toggleSizes}
                selected={selectedSizes}
                items={[
                    { text: '20 cm', value: '20' },
                    { text: '30 cm', value: '30' },
                    { text: '40 cm', value: '40' },
                ]}
            />

            {/* Price range */}
            <div className='mt-5 border-y border-y-neutral-200 py-6 pb-7'>
                <p className='font-bold mb-3'>Price range:</p>
                <div className='flex gap-3 mb-5'>
                    <Input
                        type='number'
                        placeholder='0'
                        min={0}
                        max={100}
                        value={String(price.priceFrom)}
                        onChange={(e) => updatePrice('priceFrom', Number(e.target.value))} />

                    <Input
                        type='number'
                        min={10}
                        max={100}
                        placeholder='100'
                        value={String(price.priceTo)}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))} />
                </div>

                <RangeSlider
                    min={0}
                    max={100}
                    step={5}
                    value={[
                        price.priceFrom,
                        price.priceTo
                    ]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })} />
            </div>

            <CheckboxFiltersGroup
                title='Ingredients'
                name='Ingredients'
                className='mt-5'
                limit={6}
                defaultItems={ingredients.slice(0, 6)}
                items={ingredients}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients} />


        </div>
    );
};