import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './';
import { ProductCard } from './product-card';

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
    lastClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    categoryId,
    className,
    lastClassName
}) => {
    return (
        <div className={className}>
            <Title text={title} size='lg' className='mb-5 font-extrabold' />

            <div className={cn('grid grid-cols-3 gap-[50px]', lastClassName)}>
                {items.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                    // ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};