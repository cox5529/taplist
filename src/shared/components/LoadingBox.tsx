import React from 'react';

import Spinner from './shapes/Spinner';
import SectionHeader from './typography/SectionHeader';

type Props = {};

const LoadingBox = (props: Props) => {
  return (
    <div className='fixed w-screen h-screen flex items-center justify-center inset-0 flex-col gap-8 bg-white'>
      <SectionHeader>Loading...</SectionHeader>
      <Spinner className='w-20 h-20' />
    </div>
  );
};

export default LoadingBox;
