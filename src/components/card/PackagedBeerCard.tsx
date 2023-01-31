import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Beer } from '../../models/beer';
import { toDateString } from '../../utils/date-utils';
import BottledNoKeg from '../beer/BottledNoKeg';
import Fermenter from '../beer/Fermenter';
import SubsectionHeader from '../typography/SubsectionHeader';
import Card from './Card';
import PackagedBeerCardField from './PackagedBeerCardField';

type Props = {
  beer: Beer;
};

const PackagedBeerCard: React.FC<Props> = ({ beer }: Props) => {
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
        </div>
        <div className='w-full grid grid-cols-3 grid-flow-row-dense gap-x-4 gap-y-2'>
          <PackagedBeerCardField title='ABV'>{beer.abv}%</PackagedBeerCardField>
          <PackagedBeerCardField title='IBU'>{beer.ibu}</PackagedBeerCardField>
          <PackagedBeerCardField title='Color'>{beer.srm}</PackagedBeerCardField>
          <PackagedBeerCardField title='OG'>{beer.originalGravity}</PackagedBeerCardField>
          <PackagedBeerCardField title='Brew Date' className='col-span-2'>
            {toDateString(beer.brewDate)}
          </PackagedBeerCardField>
          <PackagedBeerCardField title='FG'>{beer.finalGravity}</PackagedBeerCardField>
          <PackagedBeerCardField title='Package Date' className='col-span-2'>
            {toDateString(beer.packageDate)}
          </PackagedBeerCardField>
          <PackagedBeerCardField title='Description' className='col-span-3'>
            {beer.description}
          </PackagedBeerCardField>
        </div>
      </div>
    </Card>
  );
};

export default PackagedBeerCard;
