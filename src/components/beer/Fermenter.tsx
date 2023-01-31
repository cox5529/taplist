import React from 'react';

import { SrmTable } from '../../utils/srm-table';

import { ReactComponent as Flask } from '../../assets/flask.svg';

type Props = {
  color: number;
};

const Fermenter: React.FC<Props> = (props: Props) => {
  const color = SrmTable[Math.floor(props.color)];

  return <Flask className='w-32 h-full' style={{ color }} />;
};

export default Fermenter;
