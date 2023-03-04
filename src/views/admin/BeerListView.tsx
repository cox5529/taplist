import React from 'react';

import { Query, collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

import AddCard from '../../components/card/AddCard';
import PackagedBeerCard from '../../components/card/PackagedBeerCard';
import Spinner from '../../components/shapes/Spinner';
import { firestore } from '../../firebase';
import { useScales } from '../../hooks/useScales';
import { Beer } from '../../models/beer';

const BeerListView: React.FC = () => {
  const q = query(collection(firestore, 'beer'), orderBy('brewDate', 'desc'));
  const [response] = useCollection<Beer>(q as Query<Beer>);
  const scales = useScales();

  const navigate = useNavigate();

  const onAdd = (): void => navigate('add');

  const data = response?.docs.map((x) => ({ id: x.id, ...x.data() }));

  return (
    <div className='grid xl:grid-cols-2 gap-8'>
      <AddCard onClick={onAdd} />
      {data ? (
        data.map((x, i) => <PackagedBeerCard beer={x} key={i} scale={scales.find((s) => s.ip === x.scale)} />)
      ) : (
        <Spinner className='w-20 h-20' />
      )}
    </div>
  );
};

export default BeerListView;
