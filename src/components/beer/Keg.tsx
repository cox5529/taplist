import React from 'react';

import cx from 'classnames';

import { Scale } from '../../models/scale';
import { SrmTable } from '../../utils/srm-table';

type Props = {
  className?: string;
  srm: number;
  keg: number;
  scale?: Scale;
};

const Keg: React.FC<Props> = (props: Props) => {
  const color = SrmTable[Math.floor(props.srm)];
  const full = props.scale?.percentFull === undefined ? 100 : props.scale?.percentFull;
  const glasses = props.scale?.ouncesRemaining ? Math.floor(props.scale.ouncesRemaining / 12) : 0;

  return (
    <div className={cx('flex flex-col aspect-[1/3] h-60 items-center')}>
      <div className='w-full flex-grow flex flex-col relative'>
        <div className='w-full bg-stone-700 h-6 rounded-t-lg flex items-center justify-center'>
          <div className='rounded bg-white w-1/2 h-3'></div>
        </div>
        <div className='flex-grow flex flex-col justify-end bg-stone-100'>
          <div style={{ backgroundColor: color, height: `${full}%` }}></div>
        </div>
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
