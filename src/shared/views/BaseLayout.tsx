import React from 'react';

import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC = () => {
  return (
    <div className='bg-white text-black w-screen h-screen overflow-auto print:h-auto'>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
