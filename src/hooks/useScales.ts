import { useMemo } from 'react';

import { collection, CollectionReference } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore } from '../firebase';
import { Scale } from '../models/scale';

export function useScales(): Scale[] {
  const [scales] = useCollection<Scale>(collection(firestore, 'scales') as CollectionReference<Scale>);

  return useMemo(() => scales?.docs.map((x) => ({ ...x.data(), ip: x.id })) ?? [], [scales?.docs]);
}
