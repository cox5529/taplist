import React from 'react';

import { Query, collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import PackagedBeerCard from '../../components/card/PackagedBeerCard';
import PackagedBeerKeyCard from '../../components/card/PackagedBeerKeyCard';
import Spinner from '../../components/shapes/Spinner';
import { firestore } from '../../firebase';
import { Beer } from '../../models/beer';

const KioskView: React.FC = () => {
  const q = query(collection(firestore, 'beer'), orderBy('brewDate', 'desc'));
  const [response] = useCollection<Beer>(q as Query<Beer>);

  const data = response?.docs.map((x) => ({ id: x.id, ...x.data() }));

  return (
    <div className='grid lg:grid-cols-2 text-xl gap-8 p-8'>
      {data ? data.map((x, i) => <PackagedBeerCard beer={x} key={i} />) : <Spinner className='w-20 h-20' />}
      <PackagedBeerKeyCard />
    </div>
  );
};

export default KioskView;
