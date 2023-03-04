import React from 'react';

import Keg from './Keg';

import { ReactComponent as Cap } from '../../assets/cap.svg';
import { Scale } from '../../models/scale';

type Props = {
  capColor: string;
  srm: number;
  keg: number;
  scale?: Scale;
};

const BottleAndKeg: React.FC<Props> = (props: Props) => {
  return (
    <div className='flex flex-col items-center gap-4 h-full'>
      <Cap className='w-full h-16' style={{ color: props.capColor }} />
      <Keg className='w-28 h-32' srm={props.srm} keg={props.keg} scale={props.scale} />
    </div>
  );
};

export default BottleAndKeg;
