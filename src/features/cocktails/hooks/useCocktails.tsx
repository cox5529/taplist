import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Cocktail } from '../models/cocktail';
import { fetchCocktail } from '../redux/fetchCocktail';
import { cocktailSlice } from '../redux/reducer';

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
