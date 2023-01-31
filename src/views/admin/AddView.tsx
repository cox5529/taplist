import React from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import GenericFormCard from '../../components/form-controls/GenericFormCard';
import { firestore } from '../../firebase';
import { Beer, beerFields, beerValidators } from '../../models/beer';

const AddView: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: Beer = {
    name: '',
    abv: 5,
    srm: 5,
    ibu: 20,
    originalGravity: 1.05,
    finalGravity: 1.012,
    description: '',
    packageDate: new Date(),
    brewDate: new Date(),
    type: 'fermenting',
    capColor: '',
    keg: 0,
  };

  const onSubmit = async (values: Beer): Promise<void> => {
    await addDoc(collection(firestore, 'beer'), values);
    navigate('..');
  };

  return (
    <GenericFormCard
      title='Add a beer'
      initialValues={initialValues}
      validators={beerValidators}
      onSubmit={onSubmit}
      fields={beerFields}
    />
  );
};

export default AddView;
