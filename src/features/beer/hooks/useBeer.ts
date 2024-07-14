import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import { Beer } from '../models/beer';

export const useBeer = async (id: string): Promise<Beer> => {
  const beer = await getDoc(doc(firestore, 'beer', id ?? '') as DocumentReference<Beer>).then((x) =>
    x.data(),
  );

  if (!beer) {
    throw new PageNotFoundError(`/cocktails/${id}`);
  }

  return beer;
};
