import React from 'react';
import { Outlet } from 'react-router-dom';

const CocktailLayout = () => {
  return <div className='py-8 max-w-[500px] mx-auto flex flex-col'>
    <Outlet />
  </div>;
};

export default CocktailLayout;
