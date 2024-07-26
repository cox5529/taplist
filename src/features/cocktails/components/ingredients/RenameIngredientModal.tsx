import React, { useState } from 'react';
import BaseModal, { BaseModalProps } from '../../../../shared/components/modals/BaseModal';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import { Ingredient } from '../../models/ingredient';
import Button from '../../../../shared/components/buttons/Button';
import { Cocktail } from '../../models/cocktail';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../../firebase';
import { Form, Formik } from 'formik';
import TextField from '../../../../shared/components/form-controls/TextField';
import { object, string } from 'yup';

type Props = BaseModalProps & {
  ingredient: Ingredient;
  close: () => void;
};

type FormValues = {
  name: string;
};

const RenameIngredientModal: React.FC<Props> = (props: Props) => {
  const rename = async (values: FormValues) => {
    props.ingredient.name = values.name;

    await setDoc(doc(firestore, 'ingredients', props.ingredient.id), props.ingredient);

    props.close();
  };

  const name = props.ingredient?.name ?? '';

  const initialValues: FormValues = {
    name,
  };

  const validationSchema = object({
    name: string().required('This field is required'),
  });

  return (
    <BaseModal open={props.open}>
      <SubsectionHeader>Rename '{name}'</SubsectionHeader>
      <Formik onSubmit={rename} initialValues={initialValues} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <TextField name='name' label='Name' />
            <div className='flex gap-4 justify-start'>
              <Button color='red' click={props.close} type='button'>
                Cancel
              </Button>
              <Button loading={isSubmitting} disabled={isSubmitting} type='submit'>
                Rename
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default RenameIngredientModal;
