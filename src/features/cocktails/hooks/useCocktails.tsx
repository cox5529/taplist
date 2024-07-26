import { Cocktail } from '../models/cocktail';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { cocktailSlice } from '../redux/reducer';
import { useEffect, useMemo } from 'react';
import { fetchCocktail } from '../redux/fetchCocktail';

export type CocktailSearchConfig = {
  curated?: boolean;
  ids?: string[];
};

export function useCocktails(config: CocktailSearchConfig): [Cocktail[], boolean] {
  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => cocktailSlice.selectors.getCocktailsByIds(state, config.ids ?? []));
  const responseArray = useMemo(() => Object.entries(response), [response]);

  useEffect(() => {
    if (!response) {
      return;
    }

    for (const [id, cocktail] of responseArray) {
      if (cocktail.cocktailLoadState === 'idle') {
        dispatch(fetchCocktail(id));
      }
    }
  }, [response]);

  const cocktails = responseArray?.map(([, cocktail]) => cocktail.cocktail).filter((x) => !!x) ?? [];
  const isLoaded = responseArray?.map(([, cocktail]) => cocktail.cocktailLoadState === 'loaded');
  return [cocktails, !isLoaded];
}
