import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Beer } from '../../models/beer';
import { Scale } from '../../models/scale';
import { toDateString } from '../../utils/date-utils';
import BottleAndKeg from '../beer/BottleAndKeg';
import BottledNoKeg from '../beer/BottledNoKeg';
import Fermenter from '../beer/Fermenter';
import SubsectionHeader from '../typography/SubsectionHeader';
import Card from './Card';
import PackagedBeerCardField from './PackagedBeerCardField';

type Props = {
  beer: Beer;
  scale?: Scale;
};

const PackagedBeerCard: React.FC<Props> = ({ beer, scale }: Props) => {
  const navigate = useNavigate();

  const click = (): void => navigate(`/admin/${beer.id}`);

  return (
    <Card onClick={click} className='cursor-pointer hover:bg-slate-200'>
      <SubsectionHeader>{beer.name}</SubsectionHeader>
      <div className='flex'>
        <div className='w-32'>
          {beer.type === 'fermenting' && <Fermenter color={beer.srm} />}
          {beer.type === 'packaged' && beer.capColor && !beer.keg && (
            <BottledNoKeg capColor={beer.capColor} srm={beer.srm} />
          )}
          {beer.type === 'packaged' && beer.capColor && beer.keg && (
            <BottleAndKeg capColor={beer.capColor} srm={beer.srm} keg={beer.keg} percentFull={scale?.percentFull} />
          )}
        </div>
        <div className='w-full grid grid-cols-4 grid-flow-row-dense gap-x-4 gap-y-2'>
          <PackagedBeerCardField title='ABV'>{beer.abv}%</PackagedBeerCardField>
          <PackagedBeerCardField title='IBU'>{beer.ibu}</PackagedBeerCardField>
          <PackagedBeerCardField title='Color'>{beer.srm}</PackagedBeerCardField>
          <PackagedBeerCardField title='Calories'>{beer.calories}</PackagedBeerCardField>
          <PackagedBeerCardField title='Brew Date'>{toDateString(beer.brewDate)}</PackagedBeerCardField>
          <PackagedBeerCardField title='Package Date'>{toDateString(beer.packageDate)}</PackagedBeerCardField>
          <PackagedBeerCardField title='OG'>{beer.originalGravity}</PackagedBeerCardField>
          <PackagedBeerCardField title='FG'>{beer.finalGravity}</PackagedBeerCardField>
          <PackagedBeerCardField title='Description' className='col-span-4'>
            {beer.description}
          </PackagedBeerCardField>
        </div>
      </div>
    </Card>
  );
};

export default PackagedBeerCard;
