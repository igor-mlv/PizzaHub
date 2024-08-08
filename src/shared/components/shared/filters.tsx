"use client"
import React from 'react';
import { RangeSlider, CheckboxFiltersGroup } from '.';
import { Input } from '../ui';
import { useIngredients, useFilters, useQueryFilters } from '@/shared/hooks';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className, }) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map((ingredient) => ({ value: String(ingredient.id), text: ingredient.name }));

    const updatePrice = (prices: number[]) => {
        filters.setPrice('priceFrom', prices[0]);
        filters.setPrice('priceTo', prices[1]);
    }

    return (
        <div className={className}>
            <CheckboxFiltersGroup
                title="Piza Type"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={filters.setPizzaTypes}
                selected={filters.selectedPizzaTypes}
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
                onClickCheckbox={filters.setSizes}
                selected={filters.selectedSizes}
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
                        value={String(filters.price.priceFrom)}
                        onChange={(e) => filters.setPrice('priceFrom', Number(e.target.value))} />

                    <Input
                        type='number'
                        min={10}
                        max={100}
                        placeholder='100'
                        value={String(filters.price.priceTo)}
                        onChange={(e) => filters.setPrice('priceTo', Number(e.target.value))} />
                </div>

                <RangeSlider
                    min={0}
                    max={100}
                    step={5}
                    value={[
                        filters.price.priceFrom || 0,
                        filters.price.priceTo || 100
                    ]}
                    onValueChange={updatePrice} />
            </div>

            <CheckboxFiltersGroup
                title='Ingredients'
                name='Ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setIngredients}
                selected={filters.selectedIngredients} />
        </div>
    );
};