import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Cocktail } from '../models/cocktail';
import { fetchCocktail } from '../redux/fetchCocktail';
import { fetchIngredientsForCocktail } from '../redux/fetchIngredientsForCocktail';
import { cocktailSlice } from '../redux/reducer';

export const useCocktail = (id: string): [Cocktail | null, boolean] => {
  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => cocktailSlice.selectors.getCocktailById(state, id));

  useEffect(() => {
    if (response.cocktailLoadState === 'idle') {
      dispatch(fetchCocktail(id));
    } else if (
      response.cocktail &&
      response.cocktailLoadState === 'loaded' &&
      response.ingredientLoadState === 'idle'
    ) {
      dispatch(fetchIngredientsForCocktail(response.cocktail));
    }
  }, [response]);

  return [response?.cocktail ?? null, response?.cocktailLoadState !== 'loaded'];
};
