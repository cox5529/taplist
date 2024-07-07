import { useMemo } from 'react';

import { collection, CollectionReference, DocumentData, Query, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore } from '../../../firebase';
import { Cocktail } from '../models/cocktail';

export type CocktailSearchConfig = {
  curated?: boolean;
  ids?: string[];
};

export function useCocktails(config: CocktailSearchConfig): [Cocktail[], boolean] {
  const cocktailCollection = collection(firestore, 'cocktails') as CollectionReference<Cocktail>;
  let cocktailQuery: Query<Cocktail, DocumentData> = cocktailCollection;
  if (config.curated) {
    cocktailQuery = query(cocktailQuery, where('curated', '==', true));
  }

  if (config.ids && config.ids.length > 0) {
    cocktailQuery = query(cocktailQuery, where('id', 'in', config.ids));
  }

  const [cocktails, isLoading] = useCollection<Cocktail>(cocktailQuery);

  return useMemo(
    () => [cocktails?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [], isLoading],
    [cocktails?.docs, isLoading],
  );
}
