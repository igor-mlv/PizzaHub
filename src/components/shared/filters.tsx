"use client"
import React from 'react';
import { Title, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from './';
import { Input } from '../ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className, }) => {
    const { ingredientsList, loading, onAddId, selectedIds } = useFilterIngredients();
    const ingredients = ingredientsList.map((ingredient) => ({ value: String(ingredient.id), text: ingredient.name }));

    return (
        <div className={className}>
            <Title text='Filter' size='sm' className='mb-5 font-bold' />

            {/* Custom, new chekboxes */}
            <div className='flex flex-col gap-4'>
                <FilterCheckbox name='type' text='Custom' value='1' />
                <FilterCheckbox name='type' text='New' value='2' />
            </div>

            {/* Price range */}
            <div className='mt-5 border-y border-y-neutral-200 py-6 pb-7'>
                <p className='font-bold mb-3'>Price range:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={100} defaultValue={0} />
                    <Input type='number' min={10} max={100} placeholder='100' />
                </div>

                <RangeSlider min={0} max={100} step={10} value={[0, 100]} />
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
                selectedIds={selectedIds} />


        </div>
    );
};