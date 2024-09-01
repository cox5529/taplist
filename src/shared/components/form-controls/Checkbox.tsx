import React, { ReactElement, useMemo } from 'react';

import cx from 'classnames';
import { Field, useFormikContext } from 'formik';
import { uniqueId } from 'lodash';

import ErrorMessage from '../typography/ErrorMessage';
import Label from '../typography/Label';

export interface CheckboxProps<T> {
  className?: string;
  name: keyof T;
  label?: string;
}

function Checkbox<T>(props: CheckboxProps<T>): ReactElement {
  const { touched, errors } = useFormikContext<T>();
  const id = useMemo(() => uniqueId('form-field-'), []);
  const isTouched = touched ? touched[props.name] : false;
  const error = errors ? errors[props.name] : false;

  const hasError = isTouched && error;

  return (
    <div className={cx(props.className, 'flex gap-2')}>
      <Field id={id} name={props.name} className='' type={'checkbox'} />
      {props.label && <Label for={id}>{props.label}</Label>}
      {hasError && <ErrorMessage>{error.toString()}</ErrorMessage>}
    </div>
  );
}

export default Checkbox;
