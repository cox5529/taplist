import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Beer } from '../../models/beer';
import { Scale } from '../../models/scale';
import { toDateString } from '../../utils/date-utils';
import BottleAndKeg from '../beer/BottleAndKeg';
import BottledNoKeg from '../beer/BottledNoKeg';
import Fermenter from '../beer/Fermenter';
import KegNoBottle from '../beer/KegNoBottle';
import Paragraph from '../typography/Paragraph';
import SubsectionHeader from '../typography/SubsectionHeader';
import Card from './Card';
import PackagedBeerCardField from './PackagedBeerCardField';
import PackagedBeerCardRow from './PackagedBeerCardRow';

type Props = {
  beer: Beer;
  scale?: Scale;
};

const PackagedBeerCard: React.FC<Props> = ({ beer, scale }: Props) => {
  const navigate = useNavigate();

  const click = (): void => navigate(`/admin/${beer.id}`);

  const aging = beer.aging === 'true';
  const packageDate = toDateString(beer.packageDate, !aging);
  const hasBeenPackaged = !packageDate.startsWith('-');

  return (
    <>
      <Card onClick={click} className='cursor-pointer hover:bg-slate-200 md:h-96 grow-0 shrink-0 flex flex-col'>
        <SubsectionHeader>
          {beer.keg && <span>{beer.keg}. </span>}
          {beer.name}
        </SubsectionHeader>
        <div className='flex flex-grow'>
          <div className='flex-grow flex flex-col gap-4 text-lg'>
            <PackagedBeerCardField>{beer.style}</PackagedBeerCardField>
            <Paragraph className='flex-grow italic'>{beer.description}</Paragraph>
            <div className='italic'>
              <PackagedBeerCardRow>
                <PackagedBeerCardField title='ABV'>{beer.abv}%</PackagedBeerCardField>
                <PackagedBeerCardField title='IBU'>{beer.ibu}</PackagedBeerCardField>
                <PackagedBeerCardField title='SRM'>{beer.srm}</PackagedBeerCardField>
                <PackagedBeerCardField title='Calories'>{beer.calories}</PackagedBeerCardField>
              </PackagedBeerCardRow>
              <PackagedBeerCardRow>
                <PackagedBeerCardField title='Brewed'>{toDateString(beer.brewDate)}</PackagedBeerCardField>
                {hasBeenPackaged && (
                  <PackagedBeerCardField title={beer.aging === 'true' ? 'Aging' : 'Packaged'}>
                    {packageDate}
                  </PackagedBeerCardField>
                )}
              </PackagedBeerCardRow>
              <PackagedBeerCardRow>
                <PackagedBeerCardField title='OG'>{beer.originalGravity}</PackagedBeerCardField>
                <PackagedBeerCardField title='FG'>{beer.finalGravity}</PackagedBeerCardField>
              </PackagedBeerCardRow>
            </div>
          </div>
          <div className='w-32 flex-shrink-0 flex-grow-0'>
            {beer.type === 'fermenting' && <Fermenter color={beer.srm} />}
            {beer.type === 'packaged' && beer.capColor && !beer.keg && (
              <BottledNoKeg capColor={beer.capColor} srm={beer.srm} />
            )}
            {beer.type === 'packaged' && beer.capColor && beer.keg && (
              <BottleAndKeg capColor={beer.capColor} beer={beer} scale={scale} />
            )}
            {beer.type === 'packaged' && !beer.capColor && beer.keg && <KegNoBottle beer={beer} scale={scale} />}
          </div>
        </div>
      </Card>
      {/* {scale && <PouringModal beer={beer} scale={scale} />} */}
    </>
  );
};

export default PackagedBeerCard;
