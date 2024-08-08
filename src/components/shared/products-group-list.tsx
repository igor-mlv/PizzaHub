"use client"

import { cn } from '@/lib/utils';
import React from 'react';
import { useIntersection } from 'react-use';
import { Title, ProductCard } from './';
import { useCategoryStore } from '@/store/category';

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
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);


    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className='mb-5 font-extrabold' />

            <div className={cn('grid grid-cols-3 gap-[50px]', lastClassName)}>
                {items.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.variants[0].price}
                        ingredients={product.ingredients}
                        className={categoryId === 1 ? 'h-[450px]' : 'h-[390px]'}
                    />
                ))}
            </div>
        </div>
    );
};