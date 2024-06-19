import React, { useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';

import { auth } from '../../../firebase';
import Navbar from '../../components/navbar/Navbar';

const AdminLayout: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login');
    }
  }, [loading, navigate, user]);

  return (
    <div>
      <Navbar />
      <div className='p-8'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
