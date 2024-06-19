import React from 'react';

import Spinner from '../../../shared/components/shapes/Spinner';
import PackagedBeerCard from '../components/card/PackagedBeerCard';
import { useBeers } from '../hooks/useBeers';
import { useScales } from '../hooks/useScales';

const BeerList: React.FC = () => {
  const scales = useScales();
  const [beerResponse, areBeersLoaded] = useBeers();

  const data = beerResponse.sort((a, b) => {
    if (b.keg && a.keg) {
      return a.keg - b.keg;
    } else if (b.keg) {
      return 1;
    } else if (a.keg) {
      return -1;
    }

    return b.brewDate.toString().localeCompare(a.brewDate.toString());
  });

  return (
    <div className='grid xl:grid-cols-2 text-xl gap-8'>
      {areBeersLoaded ? (
        data.map((x, i) => <PackagedBeerCard beer={x} key={i} scale={scales.find((s) => s.ip === x.scale)} />)
      ) : (
        <Spinner className='w-20 h-20' />
      )}
    </div>
  );
};

export default BeerList;
