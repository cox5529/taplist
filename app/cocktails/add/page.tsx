import React from 'react';
import { useIngredients } from '../../../src/features/cocktails/hooks/useIngredients';
import AuthenticationGuard from '../../../src/shared/components/auth/AuthenticationGuard';
import SectionHeaderWithButton from '../../../src/shared/components/typography/SectionHeaderWithButton';
import CocktailForm from '../../../src/features/cocktails/components/cocktail-form/CocktailForm';
import { Page } from '../../../src/types';

const CocktailAddView: Page = async () => {
  const ingredients = await useIngredients();

  return (
    <AuthenticationGuard redirect='/'>
      <section>
        <SectionHeaderWithButton header='New Cocktail' backButton />
      </section>
      <CocktailForm ingredients={ingredients} />
    </AuthenticationGuard>
  );
};

export default CocktailAddView;
