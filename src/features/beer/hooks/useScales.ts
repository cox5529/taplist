import { useMemo } from 'react';

import { collection, CollectionReference, getDocs } from 'firebase/firestore';

import { firestore } from '../../../firebase';
import { Scale } from '../models/scale';

export async function useScales(): Promise<Scale[]> {
  const scales = await getDocs(collection(firestore, 'scales') as CollectionReference<Scale>);

  return scales?.docs.map((x) => ({ ...x.data(), ip: x.id })) ?? [];
}
