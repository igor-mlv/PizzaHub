import { Plus } from 'lucide-react';
import React from 'react';
import { Title } from '.';
import { Button } from '../ui';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';
import { cn } from '@/shared/lib/utils';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients: Ingredient[];
    className?: string;
}

export const ProductCard: React.FC<Props> = ({
    id,
    name,
    price,
    imageUrl,
    ingredients,
    className
}) => {
    return (
        <div className={cn('relative', className)}>
            <Link href={`/product/${id}`}>
                <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
                    <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
                </div>

                <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

                <p className='text-sm text-gray-400'>{ingredients
                    .map((ingredient, index) =>
                        index === 0
                            ? ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)
                            : ingredient.name
                    )
                    .join(', ')}</p>

                <div className='w-full flex justify-between items-center mt-4 absolute bottom-0'>
                    <span className='text-[20px]'>
                        from <b>{price} CAD$</b>
                    </span>

                    <Button variant="secondary" className='text-base font-bold w-[140px]'>
                        <Plus size={20} className='mr-1' />
                        Add to cart
                    </Button>
                </div>
            </Link>
        </div>
    );
};