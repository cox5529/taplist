import { Cocktail } from '../models/cocktail';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { cocktailSlice } from '../redux/reducer';
import { useEffect, useMemo } from 'react';
import { fetchCuratedCocktails } from '../redux/fetchCuratedCocktails';

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
