import React from 'react';

import PackagedBeerCard from '../components/card/PackagedBeerCard';
import { Beer } from '../models/beer';
import { Scale } from '../models/scale';

type Props = {
  beerResponse: Beer[];
  scales: Scale[];
};

const BeerList: React.FC<Props> = ({ beerResponse, scales }) => {
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
    <div className='grid md:grid-cols-2 xl:grid-cols-3 text-xl gap-8'>
      {data.map((x, i) => (
        <PackagedBeerCard beer={x} key={i} scale={scales.find((s) => s.ip === x.scale)} />
      ))}
    </div>
  );
};

export default BeerList;
