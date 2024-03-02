import React from 'react';

import cx from 'classnames';

import { Scale } from '../../models/scale';
import { SrmTable } from '../../utils/srm-table';
import { Beer } from '../../models/beer';
import Clock from '../../assets/clock.svg';

export type KegProps = {
  className?: string;
  beer: Beer;
  scale?: Scale;
};

const Keg: React.FC<KegProps> = (props: KegProps) => {
  const color = SrmTable[Math.floor(props.beer.srm)];
  let full = 100;
  const glasses = props.scale?.ouncesRemaining ? Math.floor(props.scale.ouncesRemaining / 12) : 0;

  if (props.beer.empty === 'true') {
    full = 0;
  } else if (props.scale?.percentFull !== undefined) {
    full = props.scale?.percentFull;
  }

  return (
    <div className={cx('flex flex-col w-20 h-full items-center', props.className)}>
      <div className='w-full flex-grow flex flex-col relative'>
        <div className='w-full bg-stone-700 h-6 rounded-t-lg flex items-center justify-center'>
          <div className='rounded bg-white w-1/2 h-3'></div>
        </div>
        <div className='flex-grow flex flex-col justify-end bg-stone-100'>
          <div style={{ backgroundColor: color, height: `${full}%` }}></div>
        </div>
        {props.beer.aging === 'true' && <img className='absolute w-10 left-5 bottom-28' src={Clock} alt='Clock' />}
        <div className='w-full bg-stone-700 h-6 rounded-b-lg flex items-center justify-center'></div>
        <div className='rounded-r-lg bg-stone-900 opacity-10 right-0 w-4 h-full absolute'></div>
      </div>
      {props.scale && (
        <div className='text-sm text-center'>
          <div>{full.toFixed(1)}%</div>
          {glasses ? <div>{glasses} glasses</div> : <div>Empty</div>}
        </div>
      )}
    </div>
  );
};

export default Keg;
