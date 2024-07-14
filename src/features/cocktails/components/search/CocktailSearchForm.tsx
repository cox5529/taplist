'use client';

import { Form, Formik } from 'formik';
import React from 'react';
import TextField from '../../../../shared/components/form-controls/TextField';
import SearchButton from '../../../../shared/components/buttons/SearchButton';
import { useRouter } from 'next/navigation';

type Props = {
  initialSearch?: string;
};

type FormValues = {
  search: string;
};

const CocktailSearchForm: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  const initialValues: FormValues = {
    search: props.initialSearch ?? '',
  };

  const onSubmit = (values: FormValues) => {
    if (!values.search || values.search.length === 0) {
      return;
    }

    router.push(`/cocktails/search?query=${encodeURIComponent(values.search)}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className='flex gap-2 items-start'>
        <TextField name='search' className='flex-grow' placeholder='Search' />
        <SearchButton />
      </Form>
    </Formik>
  );
};

export default CocktailSearchForm;
