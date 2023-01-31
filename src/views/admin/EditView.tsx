import React, { useMemo } from 'react';

import { DocumentReference, doc, setDoc } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import GenericFormCard from '../../components/form-controls/GenericFormCard';
import Spinner from '../../components/shapes/Spinner';
import { firestore } from '../../firebase';
import { Beer, beerFields, beerValidators } from '../../models/beer';
import { toISODateString } from '../../utils/date-utils';

const EditView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data] = useDocumentDataOnce<Beer>(doc(firestore, 'beer', id ?? '') as DocumentReference<Beer>);

  const onSubmit = async (values: Beer): Promise<void> => {
    await setDoc(doc(firestore, 'beer', id ?? ''), values);
    navigate('..');
  };

  const beer: Beer | undefined = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return { ...data, brewDate: toISODateString(data.brewDate), packageDate: toISODateString(data.packageDate) };
  }, [data]);

  return beer ? (
    <GenericFormCard
      title={`Update ${beer.name}`}
      initialValues={beer}
      validators={beerValidators}
      onSubmit={onSubmit}
      fields={beerFields}
    />
  ) : (
    <Spinner className='w-32 h-32' />
  );
};

export default EditView;
