import React from 'react';

import { Outlet } from 'react-router-dom';

import Card from '../../components/card/Card';

const AuthenticationLayout: React.FC = () => {
  return (
    <div className='h-full w-full flex items-center justify-center p-4'>
      <Card className='w-full md:max-w-2xl'>
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthenticationLayout;
