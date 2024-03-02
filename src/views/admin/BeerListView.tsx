import React from 'react';

import PackagedBeerCard from '../../components/card/PackagedBeerCard';
import Spinner from '../../components/shapes/Spinner';
import { useBeers } from '../../hooks/useBeers';
import { useScales } from '../../hooks/useScales';

const BeerListView: React.FC = () => {
  const scales = useScales();
  const [beers, areBeersLoaded] = useBeers();

  return (
    <div className='grid xl:grid-cols-2 gap-8'>
      {areBeersLoaded ? (
        beers.map((x, i) => <PackagedBeerCard beer={x} key={i} scale={scales.find((s) => s.ip === x.scale)} />)
      ) : (
        <Spinner className='w-20 h-20' />
      )}
    </div>
  );
};

export default BeerListView;
