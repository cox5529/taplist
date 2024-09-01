import React from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import { firestore } from '../../../../firebase';
import Button from '../../../../shared/components/buttons/Button';
import TextField from '../../../../shared/components/form-controls/TextField';
import BaseModal, { BaseModalProps } from '../../../../shared/components/modals/BaseModal';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import { Ingredient } from '../../models/ingredient';

type Props = BaseModalProps & {
  ingredient: Ingredient;
  close: () => void;
};

interface FormValues {
  name: string;
}

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
      <SubsectionHeader>Rename &apos;{name}&apos;</SubsectionHeader>
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
