import React from 'react';

import { useNavigate } from 'react-router-dom';

import Card from '../../../../shared/components/card/Card';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import { toDateString, toRelativeDateString } from '../../../../shared/utils/date-utils';
import { Beer } from '../../models/beer';
import { Scale } from '../../models/scale';
import BottleAndKeg from '../beer/BottleAndKeg';
import BottledNoKeg from '../beer/BottledNoKeg';
import KegNoBottle from '../beer/KegNoBottle';
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
  const packageRelativeDate = toRelativeDateString(beer.packageDate, !aging);
  const packageDate = toDateString(beer.packageDate);
  const brewDate = toDateString(beer.brewDate);
  const hasBeenPackaged = !packageRelativeDate.startsWith('-');

  return (
    <>
      <Card
        onClick={click}
        className='cursor-pointer hover:bg-slate-200 md:h-96 grow-0 shrink-0 flex flex-col break-inside-avoid'
      >
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
                <PackagedBeerCardField className={'print:hidden'} title='Brewed'>
                  {toRelativeDateString(beer.brewDate)}
                </PackagedBeerCardField>
                <PackagedBeerCardField className={'hidden print:block'} title={'Brewed'}>
                  {brewDate}
                </PackagedBeerCardField>
                {hasBeenPackaged && (
                  <>
                    <PackagedBeerCardField
                      className={'print:hidden'}
                      title={beer.aging === 'true' ? 'Aging' : 'Packaged'}
                    >
                      {packageRelativeDate}
                    </PackagedBeerCardField>
                    <PackagedBeerCardField
                      className={'hidden print:block'}
                      title={beer.aging === 'true' ? 'Aging since' : 'Packaged'}
                    >
                      {packageDate}
                    </PackagedBeerCardField>
                  </>
                )}
              </PackagedBeerCardRow>
              <PackagedBeerCardRow>
                <PackagedBeerCardField title='OG'>{beer.originalGravity}</PackagedBeerCardField>
                <PackagedBeerCardField title='FG'>{beer.finalGravity}</PackagedBeerCardField>
              </PackagedBeerCardRow>
            </div>
          </div>
          <div className='w-20 flex-shrink-0 flex-grow-0 print:hidden'>
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
    </>
  );
};

export default PackagedBeerCard;
