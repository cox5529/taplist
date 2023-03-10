import React from 'react';
import Keg, { KegProps } from './Keg';

type Props = KegProps;

const KegNoBottle: React.FC<Props> = (props: Props) => {
  return <div className='flex flex-col items-center justify-end gap-4 h-full'>
    <Keg className='w-full h-full' beer={props.beer} scale={props.scale} />
  </div>;
};

export default KegNoBottle;
