import React, { ReactElement, useMemo } from 'react';

import cx from 'classnames';
import { Field, useFormikContext } from 'formik';
import { uniqueId } from 'lodash';

import ErrorMessage from '../typography/ErrorMessage';
import Label from '../typography/Label';

export type TextFieldProps<T> = {
  className?: string;
  name: keyof T;
  label?: string;
  autoComplete?: boolean;
  as?: string;
  fieldType?: string;
};

function TextField<T>(props: TextFieldProps<T>): ReactElement {
  const { touched, errors } = useFormikContext<T>();
  const id = useMemo(() => uniqueId('form-field-'), []);
  const isTouched = touched ? touched[props.name] : false;
  const error = errors ? errors[props.name] : false;

  const hasError = isTouched && error;
  const fieldType = props.fieldType ?? 'text';

  return (
    <div className={cx(props.className, { 'pb-8': !hasError })}>
      {props.label && <Label for={id}>{props.label}</Label>}
      <Field
        id={id}
        name={props.name}
        as={props.as}
        autoComplete={props.autoComplete ? 'on' : 'off'}
        className='block border rounded px-2 py-1 outline-none w-full'
        type={fieldType}
      />
      {hasError && <ErrorMessage>{error.toString()}</ErrorMessage>}
    </div>
  );
}

export default TextField;
