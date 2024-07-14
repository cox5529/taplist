'use client';

import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from '../buttons/Button';
import ErrorMessage from '../typography/ErrorMessage';
import TextField from '../form-controls/TextField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { object, string } from 'yup';
import { FirebaseError } from 'firebase/app';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const login = async (values: LoginFormValues): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    }
  };

  const schema = object({
    email: string().required('This field is required').email('This is not a valid email address'),
    password: string().required('This field is required'),
  });

  const initialValues: LoginFormValues = { email: '', password: '' };

  const errorMessage = {
    'auth/wrong-password': 'Incorrect email or password',
    'auth/user-not-found': 'Incorrect email or password',
  }[error ?? ''];

  return (
    <Formik initialValues={initialValues} onSubmit={login} validationSchema={schema}>
      {({ isSubmitting }): React.ReactElement => (
        <Form className='flex flex-col gap-8'>
          <div className='grid grid-flow-row-dense grid-cols-fit-250 gap-x-8 gap-y-4'>
            <TextField name={'email'} fieldType={'email'} label={'Email Address'} />
            <TextField name={'password'} fieldType={'password'} label={'Password'} />
          </div>
          <div className='flex justify-end gap-4'>
            <span>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </span>
            <Button type='submit' disabled={isSubmitting} loading={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
