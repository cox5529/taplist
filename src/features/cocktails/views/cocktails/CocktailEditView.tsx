import React, { useEffect, useState } from 'react';

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
import { useAppDispatch } from '../../../../redux/hooks';
import { cocktailSlice } from '../../redux/reducer';
import DeleteCocktailModal from '../../components/cocktail-form/DeleteCocktailModal';

const CocktailEditView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [user, isAuthLoading] = useAuthState(auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    dispatch(cocktailSlice.actions.updateCocktail(cocktail));
    navigate(parentRoute);
  };

  const onDelete = async () => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteComplete = async () => {
    setIsDeleteModalOpen(false);
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
          <Button color='red' click={onDelete}>Delete</Button>
          <Button to={parentRoute}>Back</Button>
        </SectionHeaderWithButton>
      </section>
      <CocktailForm cocktail={cocktail} onSubmit={onEdit} />
      <DeleteCocktailModal open={isDeleteModalOpen} id={id ?? ''} close={onDeleteComplete} />
    </>
  );
};

export default CocktailEditView;
