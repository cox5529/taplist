import React from 'react';

import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC = () => {
  return (
    <div className='bg-zinc-600 text-white w-screen h-screen'>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
