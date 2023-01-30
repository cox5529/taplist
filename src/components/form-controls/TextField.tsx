import React, { ReactElement, useMemo } from 'react';

import cx from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { uniqueId } from 'lodash';

import ErrorMessage from '../typography/ErrorMessage';
import Label from '../typography/Label';

export type TextFieldProps<T> = {
  className?: string;
  type: 'textfield';

  name: keyof T;
  label?: string;
  autoComplete?: boolean;
  fieldType?: string;

  touched?: FormikTouched<T>;
  errors?: FormikErrors<T>;
};

function TextField<T>(props: TextFieldProps<T>): ReactElement {
  const id = useMemo(() => uniqueId('form-field-'), []);
  const isTouched = props.touched ? props.touched[props.name] : false;
  const error = props.errors ? props.errors[props.name] : false;

  const fieldType = props.fieldType ?? 'text';

  return (
    <div className={cx(props.className, '')}>
      {props.label && <Label for={id}>{props.label}</Label>}
      <Field
        id={id}
        name={props.name}
        autoComplete={props.autoComplete ? 'on' : 'off'}
        className='block border rounded px-2 py-1 outline-none w-full'
        type={fieldType}
      />
      {isTouched && error && <ErrorMessage>{error.toString()}</ErrorMessage>}
    </div>
  );
}

export default TextField;
