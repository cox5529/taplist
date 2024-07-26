import { Form, Formik } from 'formik';
import React from 'react';
import TextField from '../../../../shared/components/form-controls/TextField';
import SearchButton from '../../../../shared/components/buttons/SearchButton';
import { useNavigate } from 'react-router-dom';

type Props = {
  initialSearch?: string;
};

type FormValues = {
  search: string;
};

const CocktailSearchForm: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    search: props.initialSearch ?? '',
  };

  const onSubmit = (values: FormValues) => {
    if (!values.search || values.search.length === 0) {
      return;
    }

    navigate(`/cocktails/search?query=${encodeURIComponent(values.search)}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className='flex gap-2 items-start' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <TextField name='search' className='flex-grow' placeholder='Search' />
        <SearchButton />
      </Form>
    </Formik>
  );
};

export default CocktailSearchForm;
