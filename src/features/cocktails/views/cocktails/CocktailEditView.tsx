import React, { useEffect } from 'react';

import { doc, DocumentReference, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { auth, firestore } from '../../../../firebase';
import Button from '../../../../shared/components/buttons/Button';
import SectionHeader from '../../../../shared/components/typography/SectionHeader';
import CocktailForm from '../../components/cocktail-form/CocktailForm';
import { Cocktail } from '../../models/cocktail';
import { useCocktail } from '../../hooks/useCocktail';
import LoadingBox from '../../../../shared/components/LoadingBox';
import SectionHeaderWithButton from '../../../../shared/components/typography/SectionHeaderWithButton';

const CocktailEditView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, isAuthLoading] = useAuthState(auth);
  const parentRoute = `/cocktails/${id}`;

  const [cocktail, isCocktailLoading] = useCocktail(id ?? '');

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate(parentRoute);
    }
  }, [isAuthLoading, navigate, parentRoute, user]);

  const onEdit = async (cocktail: Cocktail) => {
    cocktail.id = id ?? '';
    await setDoc(doc(firestore, 'cocktails', cocktail.id), cocktail);
    navigate(parentRoute);
  };

  if (isCocktailLoading) {
    return <LoadingBox />;
  }

  if (!cocktail) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <section>
        <SectionHeaderWithButton header={`Edit ${cocktail.name}`}>
          <Button to={parentRoute}>Back</Button>
        </SectionHeaderWithButton>
      </section>
      <CocktailForm cocktail={cocktail} onSubmit={onEdit} />
    </>
  );
};

export default CocktailEditView;
