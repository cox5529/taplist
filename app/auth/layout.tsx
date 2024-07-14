import React from 'react';

import { Layout } from '../../src/types';
import Card from '../../src/shared/components/card/Card';

const AuthenticationLayout: Layout = ({ children }) => {
  return (
    <div className='h-full w-full flex items-center justify-center p-4'>
      <Card className='w-full md:max-w-2xl'>{children}</Card>
    </div>
  );
};

export default AuthenticationLayout;
