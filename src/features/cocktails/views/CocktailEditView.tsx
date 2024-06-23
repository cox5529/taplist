import React, { useEffect } from 'react';

import { doc, DocumentReference, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { auth, firestore } from '../../../firebase';
import Button from '../../../shared/components/buttons/Button';
import SectionHeader from '../../../shared/components/typography/SectionHeader';
import CocktailForm, { CocktailFormValues } from '../components/cocktail-form/CocktailForm';
import { useIngredients } from '../hooks/useIngredients';
import { Cocktail } from '../models/cocktail';
import { Ingredient } from '../models/ingredient';

const CocktailEditView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);
  const parentRoute = `/cocktails/${id}`;
  const [ingredients] = useIngredients();

  const [cocktail] = useDocumentDataOnce<Cocktail>(
    doc(firestore, 'cocktails', id ?? '') as DocumentReference<Cocktail>,
  );

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(parentRoute);
    }
  }, [isLoading, navigate, parentRoute, user]);

  const onEdit = async (formValue: CocktailFormValues) => {
    const cocktail: Cocktail = {
      id: id ?? '',
      name: formValue.name,
      description: formValue.description,
      instructions: formValue.instructions,
      ingredients: formValue.ingredients,
    };

    for (const formIngredient of cocktail.ingredients) {
      let ingredient: Ingredient | undefined = ingredients.find((x) => x.name === formIngredient.ingredient?.name);

      if (!ingredient?.id) {
        ingredient = {
          id: uuid(),
          name: formIngredient.ingredient?.name ?? '',
        };

        await setDoc(doc(firestore, 'ingredients', ingredient.id), ingredient);
      }

      delete formIngredient.ingredient;
      formIngredient.ingredientId = ingredient.id;
    }

    await setDoc(doc(firestore, 'cocktails', id ?? ''), cocktail);
    navigate(parentRoute);
  };

  return (
    <>
      <section>
        <div className='flex justify-between items-center pb-2 gap-2'>
          <SectionHeader>Edit {cocktail?.name}</SectionHeader>
          <Button to={parentRoute}>Back</Button>
        </div>
      </section>
      <CocktailForm cocktail={cocktail} onSubmit={onEdit} />
    </>
  );
};

export default CocktailEditView;
