import React from 'react';

import { Query, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

import AddCard from '../../components/card/AddCard';
import PackagedBeerCard from '../../components/card/PackagedBeerCard';
import Spinner from '../../components/shapes/Spinner';
import { firestore } from '../../firebase';
import { Beer } from '../../models/beer';

const BeerListView: React.FC = () => {
  const [response] = useCollection<Beer>(collection(firestore, 'beer') as Query<Beer>);

  const navigate = useNavigate();

  const onAdd = (): void => navigate('add');

  const data = response?.docs.map((x) => ({ id: x.id, ...x.data() }));

  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-8'>
      <AddCard onClick={onAdd} />
      {data ? data.map((x, i) => <PackagedBeerCard beer={x} key={i} />) : <Spinner className='w-20 h-20' />}
    </div>
  );
};

export default BeerListView;
