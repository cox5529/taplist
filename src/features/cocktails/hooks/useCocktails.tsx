import { useMemo } from 'react';

import { collection, CollectionReference } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore } from '../../../firebase';
import { Cocktail } from '../models/cocktail';

export function useCocktails(): [Cocktail[], boolean] {
  const [cocktails, isLoading] = useCollection<Cocktail>(
    collection(firestore, 'cocktails') as CollectionReference<Cocktail>,
  );

  return useMemo(
    () => [cocktails?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [], !isLoading],
    [cocktails?.docs, isLoading],
  );
}
