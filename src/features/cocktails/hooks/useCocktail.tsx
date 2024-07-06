import { useDocumentData } from "react-firebase-hooks/firestore";
import { Cocktail } from "../models/cocktail";
import { doc, DocumentReference } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useIngredients } from "./useIngredients";
import { useMemo } from "react";

export const useCocktail = (id: string): [Cocktail | undefined, boolean] => {
  const [cocktail, isCocktailLoading] = useDocumentData<Cocktail>(
    doc(firestore, 'cocktails', id ?? '') as DocumentReference<Cocktail>,
  );

  const ingredientIds = cocktail?.ingredients.map((x) => x.ingredientId);
  const [ingredients, areIngredientsLoading] = useIngredients(ingredientIds ?? []);

  const cocktailIngredients = useMemo(
    () => cocktail?.ingredients.map((x) => ({ ...x, ingredient: ingredients.find((y) => y.id === x.ingredientId) })),
    [cocktail?.ingredients, ingredients],
  );

  if (cocktail && cocktailIngredients) {
    cocktail.ingredients = cocktailIngredients;
  }

  return [cocktail, isCocktailLoading || areIngredientsLoading];
};
