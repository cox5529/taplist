import React, { useEffect } from 'react';

import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { auth } from '../../../firebase';
import GenericForm, { FieldProps } from '../../components/form-controls/GenericForm';
import SectionHeader from '../../components/typography/SectionHeader';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginView: React.FC = () => {
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  const login = async (values: LoginFormValues): Promise<void> => {
    await signInWithEmailAndPassword(values.email, values.password);
  };

  const schema = object({
    email: string().required().email(),
    password: string().required(),
  });

  const fields: FieldProps<LoginFormValues>[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'textfield',
      fieldType: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'textfield',
      fieldType: 'password',
    },
  ];

  const initialValues: LoginFormValues = { email: '', password: '' };

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [navigate, user]);

  const errorMessage = {
    'auth/wrong-password': 'Incorrect email or password',
  }[error?.code ?? ''];

  return (
    <div>
      <SectionHeader>Login</SectionHeader>
      <GenericForm
        initialValues={initialValues}
        validators={schema}
        onSubmit={login}
        fields={fields}
        error={errorMessage}
      />
    </div>
  );
};

export default LoginView;
