'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChooseProductForm, ChoosePizzaForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';
// import { useCartStore } from '@/shared/store';
// import toast from 'react-hot-toast';
// import { ProductForm } from '../product-form';

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.variants[0].pizzaType);
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            variants={product.variants}
                            onSubmit={function (itemId: number, ingredients: number[]): void {
                                throw new Error('Function not implemented.');
                            }} />
                    ) : (
                        <ChooseProductForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={[]}
                            variants={[]}
                            onSubmit={function (itemId: number, ingredients: number[]): void {
                                throw new Error('Function not implemented.');
                            }} />
                    )
                }
                {/* <ProductForm product={product} onSubmit={() => router.back()} /> */}
            </DialogContent>
        </Dialog>
    );
};