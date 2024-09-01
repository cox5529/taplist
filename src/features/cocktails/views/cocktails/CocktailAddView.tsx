import React, { useEffect, useMemo } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { auth, firestore } from '../../../../firebase';
import CocktailForm from '../../components/cocktail-form/CocktailForm';
import { Cocktail } from '../../models/cocktail';
import SectionHeaderWithButton from '../../../../shared/components/typography/SectionHeaderWithButton';

const CocktailAddView: React.FC = () => {
  const id = useMemo(() => uuid(), []);
  const navigate = useNavigate();
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
        <SectionHeaderWithButton header='New Cocktail' backButton />
      </section>
      <CocktailForm onSubmit={onCreate} />
    </>
  );
};

export default CocktailAddView;
