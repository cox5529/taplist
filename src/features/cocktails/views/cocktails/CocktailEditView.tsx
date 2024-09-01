import React, { useEffect, useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { auth, firestore } from '../../../../firebase';
import { useAppDispatch } from '../../../../redux/hooks';
import LoadingBox from '../../../../shared/components/LoadingBox';
import Button from '../../../../shared/components/buttons/Button';
import SectionHeaderWithButton from '../../../../shared/components/typography/SectionHeaderWithButton';
import CocktailForm from '../../components/cocktail-form/CocktailForm';
import DeleteCocktailModal from '../../components/cocktail-form/DeleteCocktailModal';
import { useCocktail } from '../../hooks/useCocktail';
import { Cocktail } from '../../models/cocktail';
import { cocktailSlice } from '../../redux/reducer';

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
          <Button color='red' click={onDelete}>
            Delete
          </Button>
          <Button to={parentRoute}>Back</Button>
        </SectionHeaderWithButton>
      </section>
      <CocktailForm cocktail={cocktail} onSubmit={onEdit} />
      <DeleteCocktailModal open={isDeleteModalOpen} id={id ?? ''} close={onDeleteComplete} />
    </>
  );
};

export default CocktailEditView;
