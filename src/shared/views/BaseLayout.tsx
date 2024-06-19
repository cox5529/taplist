import React from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

const BaseLayout: React.FC = () => {
  return (
    <div className='bg-zinc-600 text-white w-screen h-screen overflow-auto print:h-auto'>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
