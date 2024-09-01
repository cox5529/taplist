import React from 'react';

import { Beer } from '../../models/beer';
import { Scale } from '../../models/scale';
import Keg from './Keg';

import Cap from '../../../../assets/cap.svg?react';

interface Props {
  capColor: string;
  beer: Beer;
  scale?: Scale;
}

const BottleAndKeg: React.FC<Props> = (props: Props) => {
  return (
    <div className='flex flex-col items-center gap-4 h-full'>
      <Cap className='w-full h-16' style={{ color: props.capColor }} />
      <Keg className='w-28 h-32' beer={props.beer} scale={props.scale} />
    </div>
  );
};

export default BottleAndKeg;
