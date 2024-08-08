import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
    const [ingredients, setIngredientsList] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const ingredientsData = await Api.ingredients.getAll();
                setIngredientsList(ingredientsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        fetchIngredients();
    }, []);

    return {
        ingredients,
        loading,
    };

}