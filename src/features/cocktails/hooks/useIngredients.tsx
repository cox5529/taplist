import { useMemo } from 'react';

import { collection, CollectionReference, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore } from '../../../firebase';
import { Ingredient } from '../models/ingredient';

export function useIngredients(ids: string[]): [Ingredient[], boolean] {
  const ingredientCollection = collection(firestore, 'ingredients') as CollectionReference<Ingredient>;
  const ingredientQuery = query(ingredientCollection, where('id', 'in', ids));

  const [ingredients, isLoading] = useCollection<Ingredient>(ingredientQuery);

  return useMemo(() => {
    const data = ingredients?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [];
    const result = ids.map((x) => data.find((y) => y.id === x) as Ingredient).filter((x) => !!x);

    return [result, !isLoading];
  }, [ingredients?.docs, isLoading, ids]);
}
