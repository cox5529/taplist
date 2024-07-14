import React from 'react';
import { Layout } from '../../src/types';
import AuthenticationGuard from '../../src/shared/components/auth/AuthenticationGuard';

const AdminLayout: Layout = ({ children }) => {
  return (
    <AuthenticationGuard redirect='/auth/login'>
      <div className='py-8'>{children}</div>
    </AuthenticationGuard>
  );
};

export default AdminLayout;
