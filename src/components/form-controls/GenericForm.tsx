import React, { useState } from 'react';

import { Form, Formik, FormikValues } from 'formik';

import Button from '../buttons/Button';
import ErrorMessage from '../typography/ErrorMessage';
import Dropdown, { DropdownProps } from './Dropdown';
import TextField, { TextFieldProps } from './TextField';

export type GenericFormProps<FormType> = {
  initialValues: FormType & FormikValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validators: any;
  onSubmit: (values: FormType) => void | Promise<void>;
  fields: FieldProps<FormType>[];
  error?: string;
};

export type FieldProps<FormType> = TextFieldProps<FormType> | DropdownProps<FormType>;

function GenericForm<FormType>(props: GenericFormProps<FormType>): React.ReactElement {
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: FormType): Promise<void> => {
    try {
      const result = props.onSubmit(values);
      if (result instanceof Promise) {
        await result;
      }
    } catch (e) {
      if (e instanceof Error) {
        setFormError(e.message);
      }
    }
  };

  const error = formError || props.error;

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validators}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }): React.ReactElement => (
        <Form className='flex flex-col gap-8'>
          <div className='grid grid-flow-row-dense grid-cols-fit-250 gap-x-8 gap-y-4'>
            {props.fields.map((field) => {
              if (field.type === 'textfield') {
                return <TextField key={field.name as string} {...field} touched={touched} errors={errors} />;
              }

              return <Dropdown key={field.name as string} {...field} touched={touched} errors={errors} />;
            })}
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <div className='flex justify-end gap-4'>
            <Button type='submit' disabled={isSubmitting} loading={isSubmitting}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default GenericForm;
