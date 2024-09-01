import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Cocktail } from '../models/cocktail';
import { fetchCuratedCocktails } from '../redux/fetchCuratedCocktails';
import { cocktailSlice } from '../redux/reducer';

export function useCuratedCocktails(): [Cocktail[], boolean] {
  const dispatch = useAppDispatch();
  const { loadState, cocktails } = useAppSelector((state) => cocktailSlice.selectors.getCuratedCocktails(state));

  useEffect(() => {
    if (loadState !== 'idle') {
      return;
    }

    dispatch(fetchCuratedCocktails());
  }, [loadState]);

  const isLoaded = loadState === 'loaded';
  return [cocktails, !isLoaded];
}
