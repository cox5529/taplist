import React from 'react';

import { useSignOut } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase';
import NavbarButton from './NavbarButton';

const Navbar: React.FC = () => {
  const [logout] = useSignOut(auth);

  return (
    <div className='h-12 border-b flex'>
      <NavbarButton to='/beer'>Beer</NavbarButton>
      <NavbarButton to='/cocktails'>Cocktails</NavbarButton>
      <span className='flex-grow'></span>
      <NavbarButton click={logout}>Logout</NavbarButton>
    </div>
  );
};

export default Navbar;
