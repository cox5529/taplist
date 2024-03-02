import { useMemo } from 'react';

import { collection, CollectionReference } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore } from '../firebase';
import { Beer } from '../models/beer';

export function useBeers(): [Beer[], boolean] {
  const [beers, isLoading] = useCollection<Beer>(collection(firestore, 'beer') as CollectionReference<Beer>);

  return useMemo(() => [beers?.docs.map((x) => ({ ...x.data(), id: x.id })) ?? [], !isLoading], [beers?.docs, isLoading]);
}
