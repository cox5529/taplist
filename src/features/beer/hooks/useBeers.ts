import { collection, CollectionReference, getDocs } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { Beer } from '../models/beer';

export async function useBeers(): Promise<Beer[]> {
  const beers = await getDocs(collection(firestore, 'beer') as CollectionReference<Beer>);

  return beers.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [];
}
