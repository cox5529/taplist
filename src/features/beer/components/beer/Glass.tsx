import React from 'react';

import { SrmTable } from '../../utils/srm-table';

type Props = {
  fill: number;
  className?: string;
  srm: number;
};

const Glass: React.FC<Props> = (props: Props) => {
  const color = SrmTable[Math.floor(props.srm)];

  return (
    <div className='border-b-8 border-r-8 border-l-8 rounded-b-3xl border-black w-60 h-80 flex justify-end flex-col'>
      <div
        className='w-full rounded-b-2xl transition-all duration-500'
        style={{ backgroundColor: color, height: `${props.fill}%` }}
      ></div>
    </div>
  );
};

export default Glass;
