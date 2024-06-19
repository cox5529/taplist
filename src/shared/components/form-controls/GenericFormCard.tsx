import React from 'react';

import Card from '../card/Card';
import SectionHeader from '../typography/SectionHeader';
import GenericForm, { GenericFormProps } from './GenericForm';
import { TextFieldProps } from './TextField';

export type GenericFormCardProps<FormType> = GenericFormProps<FormType> & {
  title?: string;
  className?: string;
};

export type FieldProps<FormType> = TextFieldProps<FormType>;

function GenericFormCard<FormType>(props: GenericFormCardProps<FormType>): React.ReactElement {
  return (
    <Card className={props.className}>
      <SectionHeader>{props.title}</SectionHeader>
      <GenericForm {...props} />
    </Card>
  );
}

export default GenericFormCard;
