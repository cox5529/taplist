import React from 'react';

import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC = () => {
  return (
    <div className='bg-white text-black w-screen h-screen overflow-auto print:h-auto px-8'>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
