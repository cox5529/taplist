import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Ingredient } from '../models/ingredient';
import { fetchAllIngredients } from '../redux/fetchAllIngredients';
import { cocktailSlice } from '../redux/reducer';

export function useIngredients(): [Ingredient[], boolean] {
  const dispatch = useAppDispatch();
  const { loadState, ingredients } = useAppSelector((state) => cocktailSlice.selectors.getAllIngredients(state));

  useEffect(() => {
    if (loadState !== 'idle') {
      return;
    }

    dispatch(fetchAllIngredients());
  }, [loadState]);

  const cocktails = ingredients.map((ingredient) => ingredient.ingredient).filter((x) => !!x) ?? [];
  const isLoaded = loadState === 'loaded';
  return [cocktails, !isLoaded];
}
