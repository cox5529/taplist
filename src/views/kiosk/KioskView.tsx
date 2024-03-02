import React from 'react';

import PackagedBeerCard from '../../components/card/PackagedBeerCard';
import PackagedBeerKeyCard from '../../components/card/PackagedBeerKeyCard';
import Spinner from '../../components/shapes/Spinner';
import { useBeers } from '../../hooks/useBeers';
import { useScales } from '../../hooks/useScales';

const KioskView: React.FC = () => {
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
    <div className='grid xl:grid-cols-2 text-xl gap-8 p-8'>
      {areBeersLoaded ? (
        data.map((x, i) => <PackagedBeerCard beer={x} key={i} scale={scales.find((s) => s.ip === x.scale)} />)
      ) : (
        <Spinner className='w-20 h-20' />
      )}
      <PackagedBeerKeyCard />
    </div>
  );
};

export default KioskView;
