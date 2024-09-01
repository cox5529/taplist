import { useEffect } from 'react';

import { Ingredient } from '../models/ingredient';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { cocktailSlice } from '../redux/reducer';
import { fetchAllIngredients } from '../redux/fetchAllIngredients';

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
