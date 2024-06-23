import React, { useEffect, useMemo } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { auth, firestore } from '../../../firebase';
import Button from '../../../shared/components/buttons/Button';
import SectionHeader from '../../../shared/components/typography/SectionHeader';
import CocktailForm from '../components/cocktail-form/CocktailForm';
import { useIngredients } from '../hooks/useIngredients';
import { Cocktail } from '../models/cocktail';

const CocktailAddView: React.FC = () => {
  const id = useMemo(() => uuid(), []);
  const navigate = useNavigate();
  const [ingredients] = useIngredients();
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [isLoading, navigate, user]);

  const onCreate = async (cocktail: Cocktail) => {
    cocktail.id = id;
    await setDoc(doc(firestore, 'cocktails', id ?? ''), cocktail);
    navigate('/');
  };

  return (
    <>
      <section>
        <div className='flex justify-between items-center pb-2 gap-2'>
          <SectionHeader>New Cocktail</SectionHeader>
          <Button to='/'>Back</Button>
        </div>
      </section>
      <CocktailForm onSubmit={onCreate} />
    </>
  );
};

export default CocktailAddView;
