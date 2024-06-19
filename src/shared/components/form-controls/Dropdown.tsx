import React, { useMemo } from 'react';

import cx from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { uniqueId } from 'lodash';

import ErrorMessage from '../typography/ErrorMessage';
import Label from '../typography/Label';

export type DropdownProps<T> = {
  className?: string;
  type: 'dropdown';

  name: keyof T;
  label?: string;
  keys: { value: string; text: string }[];

  touched?: FormikTouched<T>;
  errors?: FormikErrors<T>;
};

function Dropdown<T>(props: DropdownProps<T>): React.ReactElement {
  const id = useMemo(() => uniqueId('form-field-'), []);
  const isTouched = props.touched ? props.touched[props.name] : false;
  const error = props.errors ? props.errors[props.name] : false;

  return (
    <div className={cx(props.className, '')}>
      {props.label && <Label for={id}>{props.label}</Label>}
      <Field id={id} name={props.name} as={'select'} className='block border rounded px-2 py-1 outline-none w-full'>
        {props.keys.map((x) => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
      </Field>
      {isTouched && error && <ErrorMessage>{error.toString()}</ErrorMessage>}
    </div>
  );
}

export default Dropdown;
