import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string,
    ingredients: string,
}

export interface Filters {
    selectedSizes: Set<string>;
    selectedPizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    price: PriceProps;
}

export interface ReturnProps extends Filters {
    setPrice: (name: keyof PriceProps, userInput: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setIngredients: (value: string) => void;

}

export const useFilters = (): ReturnProps => {

    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    // Filter of Ingredients
    const [
        selectedIngredients,
        { toggle: toggleIngredients }
    ] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));


    // Filter of Sizes
    const [
        selectedSizes,
        { toggle: toggleSizes }
    ] = useSet(
        new Set<string>(searchParams.has('sizes') ?
            searchParams.get('sizes')?.split(',')
            : []
        )
    );

    // Filter of Pizza Types
    const [
        selectedPizzaTypes,
        { toggle: togglePizzaTypes }
    ] = useSet(
        new Set<string>(searchParams.has('pizzaTypes') ?
            searchParams.get('pizzaTypes')?.split(',')
            : []
        )
    );

    // Filter of Price
    const [price, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, userInput: number) => {
        //check if user input bigger then max price
        const value = userInput > 100 ? 100 : userInput;
        setPrice((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return React.useMemo(() => (
        {
            selectedIngredients,
            selectedSizes,
            selectedPizzaTypes,
            price,
            setIngredients: toggleIngredients,
            setSizes: toggleSizes,
            setPizzaTypes: togglePizzaTypes,
            setPrice: updatePrice,
        }
    ), [selectedIngredients, selectedSizes, selectedPizzaTypes, price])
}  