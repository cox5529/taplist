import React, { useEffect } from 'react';

import { Form, Formik } from 'formik';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { auth } from '../../../firebase';
import Button from '../../components/buttons/Button';
import TextField from '../../components/form-controls/TextField';
import ErrorMessage from '../../components/typography/ErrorMessage';
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
    email: string().required('This field is required').email('This is not a valid email address'),
    password: string().required('This field is required'),
  });

  const initialValues: LoginFormValues = { email: '', password: '' };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const errorMessage = {
    'auth/wrong-password': 'Incorrect email or password',
    'auth/user-not-found': 'Incorrect email or password',
  }[error?.code ?? ''];

  return (
    <div>
      <SectionHeader>Login</SectionHeader>
      <Formik initialValues={initialValues} onSubmit={login} validationSchema={schema}>
        {({ isSubmitting }): React.ReactElement => (
          <Form
            className='flex flex-col gap-8'
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className='grid grid-flow-row-dense grid-cols-fit-250 gap-x-8 gap-y-4'>
              <TextField name={'email'} fieldType={'email'} label={'Email Address'} />
              <TextField name={'password'} fieldType={'password'} label={'Password'} />
            </div>
            <div className='flex justify-end gap-4'>
              <span>
                <ErrorMessage>{errorMessage}</ErrorMessage>
              </span>
              <Button to='/' color='gray' disabled={isSubmitting} loading={isSubmitting}>
                Back
              </Button>
              <Button type='submit' disabled={isSubmitting} loading={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginView;
