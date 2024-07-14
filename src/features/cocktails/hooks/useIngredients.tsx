import { collection, CollectionReference, getDocs, orderBy, query, where } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { Ingredient } from '../models/ingredient';

export async function useIngredients(ids?: string[]): Promise<Ingredient[]> {
  const ingredientCollection = collection(firestore, 'ingredients') as CollectionReference<Ingredient>;
  const ingredientQuery = ids?.length
    ? query(ingredientCollection, where('id', 'in', ids))
    : query(ingredientCollection, orderBy('name'));

  const ingredients = await getDocs(ingredientQuery);
  const data = ingredients?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [];
  const result = ids ? ids.map((x) => data.find((y) => y.id === x) as Ingredient).filter((x) => !!x) : data;

  result.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));

  return result;
}
