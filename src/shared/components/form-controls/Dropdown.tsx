import React, { useMemo } from 'react';

import { Field, useFormikContext } from 'formik';
import { uniqueId } from 'lodash';

import ErrorMessage from '../typography/ErrorMessage';
import Label from '../typography/Label';

export type DropdownProps<T> = {
  className?: string;
  name: keyof T;
  label?: string;
  keys: { value: string; text: string }[];
};

function Dropdown<T>(props: DropdownProps<T>): React.ReactElement {
  const { touched, errors } = useFormikContext<T>();
  const id = useMemo(() => uniqueId('form-field-'), []);
  const isTouched = touched ? touched[props.name] : false;
  const error = errors ? errors[props.name] : false;

  return (
    <div className={props.className}>
      {props.label && <Label for={id}>{props.label}</Label>}
      <Field id={id} name={props.name} as={'select'} className='block border-2 h-[34px] rounded px-2 py-1 outline-none w-full'>
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
