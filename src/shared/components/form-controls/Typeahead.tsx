import React, { ReactElement, useMemo } from 'react';

import cx from 'classnames';
import { Field, useFormikContext } from 'formik';
import { uniqueId } from 'lodash';

import ErrorMessage from '../typography/ErrorMessage';
import Label from '../typography/Label';

interface TypeaheadProps<T> {
  className?: string;
  labelName: keyof T;
  valueName: keyof T;
  label?: string;
  placeholder?: string;
  keys: { value: string; text: string }[];
}

function Typeahead<T>(props: TypeaheadProps<T>): ReactElement {
  const { touched, errors } = useFormikContext<T>();
  const listId = useMemo(() => uniqueId('datalist-'), []);
  const id = useMemo(() => uniqueId('form-field-'), []);
  const isTouched = touched ? touched[props.valueName] : false;
  const error = errors ? errors[props.valueName] : false;

  const hasError = isTouched && error;

  return (
    <div className={cx(props.className, { 'pb-8': !hasError })}>
      {props.label && <Label for={id}>{props.label}</Label>}
      <Field
        id={id}
        name={props.labelName}
        className='block border rounded px-2 py-1 outline-none w-full'
        type='text'
        placeholder={props.placeholder}
        list={listId}
      />
      {hasError && <ErrorMessage>{error.toString()}</ErrorMessage>}
      <Field type='hidden' name={props.valueName} />

      <datalist id={listId}>
        {props.keys.map(({ value, text }, i) => (
          <option key={i} value={value}>
            {text}
          </option>
        ))}
      </datalist>
    </div>
  );
}

export default Typeahead;
