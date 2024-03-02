import React, { useMemo } from 'react';

import { Beer } from '../../models/beer';
import { Scale } from '../../models/scale';
import AssignmentButton from '../buttons/AssignmentButton';
import SectionHeader from '../typography/SectionHeader';
import SubsectionHeader from '../typography/SubsectionHeader';

type Props = {
  assignTap: (tap: number) => void;
  assignScale: (scale: string) => void;
  beer: Beer;
  beers: Beer[];
  scales: Scale[];
  className?: string;
};

const EditBeerForm = ({ beer, assignTap, assignScale, className, beers, scales }: Props) => {
  const taps = useMemo(() => {
    const taps = [1, 2, 3, 4];
    return taps.map((x) => ({
      id: x,
      current: beers.find((b) => b.keg === x),
    }));
  }, [beers]);

  const scaleData = useMemo(
    () =>
      scales.map((scale) => ({
        id: scale.ip,
        current: beers.find((b) => b.scale === scale.ip),
      })),
    [beers, scales],
  );

  return (
    <>
      <SectionHeader>{beer.name}</SectionHeader>
      <SubsectionHeader>Tap Assignment</SubsectionHeader>
      <div className='flex gap-4 flex-col lg:flex-row'>
        {taps.map((x) => (
          <AssignmentButton key={x.id} targetName={`${x.id}`} current={x.current?.name} click={() => assignTap(x.id)} />
        ))}
      </div>
      <SubsectionHeader className='mt-8'>Scale Assignment</SubsectionHeader>
      <div className='flex gap-4 flex-col lg:flex-row'>
        {scaleData.map((x) => (
          <AssignmentButton
            key={x.id}
            targetName={`${x.id}`}
            current={x.current?.name}
            click={() => assignScale(x.id)}
          />
        ))}
      </div>
    </>
  );
};

export default EditBeerForm;
