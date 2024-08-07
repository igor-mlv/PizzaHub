"use client"
import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps {
    ingredientsList: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredientsList, setingredientsList] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const ingredientsData = await Api.ingredients.getAll();
                setingredientsList(ingredientsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        fetchIngredients();
    }, []);
    return { ingredientsList, loading, onAddId: toggle, selectedIngredients };
};