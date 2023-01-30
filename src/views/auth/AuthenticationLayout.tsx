import React from 'react';

import { Outlet } from 'react-router-dom';

const AuthenticationLayout: React.FC = () => {
  return (
    <div className='h-full w-full flex items-center justify-center p-4'>
      <div className='bg-white text-black w-full p-4 rounded shadow md:max-w-2xl'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
