import { useMemo } from 'react';

import { collection, CollectionReference, DocumentData, getDocs, Query, query, where } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { Cocktail } from '../models/cocktail';

export type CocktailSearchConfig = {
  curated?: boolean;
  ids?: string[];
};

export async function useCocktails(config: CocktailSearchConfig): Promise<Cocktail[]> {
  const cocktailCollection = collection(firestore, 'cocktails') as CollectionReference<Cocktail>;
  let cocktailQuery: Query<Cocktail, DocumentData> = cocktailCollection;
  if (config.curated) {
    cocktailQuery = query(cocktailQuery, where('curated', '==', true));
  }

  if (config.ids && config.ids.length > 0) {
    cocktailQuery = query(cocktailQuery, where('id', 'in', config.ids));
  }

  const cocktails = await getDocs(cocktailQuery);
  return cocktails?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [];
}
