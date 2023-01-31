import React from 'react';

import { ReactComponent as Cap } from '../../assets/cap.svg';
import { ReactComponent as Bottle } from '../../assets/bottle.svg';
import { SrmTable } from '../../utils/srm-table';

type Props = {
  capColor: string;
  srm: number;
};

const BottledNoKeg: React.FC<Props> = (props: Props) => {
  const color = SrmTable[Math.floor(props.srm)];
  
  return (
    <div className='flex flex-col gap-4'>
      <Cap className='w-full h-16' style={{ color: props.capColor }} />
      <Bottle className='w-full h-32' style={{ color }} />
    </div>
  );
};

export default BottledNoKeg;
