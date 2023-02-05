import React from 'react';

import cx from 'classnames';

import { SrmTable } from '../../utils/srm-table';

type Props = {
  className?: string;
  srm: number;
  keg: number;
};

const Keg: React.FC<Props> = (props: Props) => {
  const color = SrmTable[Math.floor(props.srm)];

  return (
    <div
      className={cx(props.className, 'px-6', {
        'text-white': props.srm > 20,
      })}
    >
      <div className='w-full h-full border-4 rounded-lg border-black p-1 flex items-end'>
        <div
          className='w-full h-2/3 flex items-center justify-center text-3xl'
          style={{
            backgroundColor: color,
            mask: 'radial-gradient(5px at 50% calc(5px + 2px), #000 99%, #0000 101%) calc(50% - 2*5px) 0/calc(4 * 5px) 100%, radial-gradient(5px at 50% calc(-1*2px), #0000 99%, #000 101%) 50% 5px / calc(4 * 5px) 100% repeat-x',
          }}
        >
          {props.keg}
        </div>
      </div>
    </div>
  );
};

export default Keg;
