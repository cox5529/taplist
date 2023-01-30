import React, { useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';

const AdminLayout: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login');
    }
  }, [loading, navigate, user]);

  return (
    <div className=''>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
