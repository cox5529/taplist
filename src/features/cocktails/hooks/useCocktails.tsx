import { useMemo } from 'react';

import { collection, CollectionReference, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore } from '../../../firebase';
import { Cocktail } from '../models/cocktail';

export function useCocktails(curated: boolean): [Cocktail[], boolean] {
  const cocktailCollection = collection(firestore, 'cocktails') as CollectionReference<Cocktail>;
  const cocktailQuery = curated ? query(cocktailCollection, where('curated', '==', true)) : cocktailCollection;

  const [cocktails, isLoading] = useCollection<Cocktail>(cocktailQuery);

  return useMemo(
    () => [cocktails?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [], !isLoading],
    [cocktails?.docs, isLoading],
  );
}
