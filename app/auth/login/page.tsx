import React from 'react';

import AuthenticationGuard from '../../../src/shared/components/auth/AuthenticationGuard';
import SectionHeader from '../../../src/shared/components/typography/SectionHeader';
import LoginForm from '../../../src/shared/components/auth/LoginForm';

const LoginView: React.FC = () => {
  return (
    <AuthenticationGuard invert redirect='/'>
      <div>
        <SectionHeader>Login</SectionHeader>
        <LoginForm />
      </div>
    </AuthenticationGuard>
  );
};

export default LoginView;
