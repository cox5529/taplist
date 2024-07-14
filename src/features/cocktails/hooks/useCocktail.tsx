import { Cocktail } from '../models/cocktail';
import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { useIngredients } from './useIngredients';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';

export const useCocktail = async (id: string): Promise<Cocktail> => {
  const cocktail = await getDoc(doc(firestore, 'cocktails', id ?? '') as DocumentReference<Cocktail>).then((x) =>
    x.data(),
  );

  const ingredientIds = cocktail?.ingredients.map((x) => x.ingredientId);
  const ingredients = await useIngredients(ingredientIds ?? []);

  const cocktailIngredients = cocktail?.ingredients.map((x) => ({
    ...x,
    ingredient: ingredients.find((y) => y.id === x.ingredientId),
  }));

  if (cocktail && cocktailIngredients) {
    cocktail.ingredients = cocktailIngredients;
  }

  if (!cocktail) {
    throw new PageNotFoundError(`/cocktails/${id}`);
  }

  return cocktail;
};
