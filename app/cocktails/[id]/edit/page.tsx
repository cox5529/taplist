import React from 'react';
import { Page } from '../../../../src/types';
import { useCocktail } from '../../../../src/features/cocktails/hooks/useCocktail';
import AuthenticationGuard from '../../../../src/shared/components/auth/AuthenticationGuard';
import SectionHeaderWithButton from '../../../../src/shared/components/typography/SectionHeaderWithButton';
import Button from '../../../../src/shared/components/buttons/Button';
import CocktailForm from '../../../../src/features/cocktails/components/cocktail-form/CocktailForm';
import { useIngredients } from '../../../../src/features/cocktails/hooks/useIngredients';

type Params = {
  id: string;
};

const CocktailEditView: Page<Params> = async (props) => {
  const id = props.params.id;
  const parentRoute = `/cocktails/${id}`;

  const cocktail = await useCocktail(id ?? '');
  const ingredients = await useIngredients();

  return <AuthenticationGuard redirect='..'>
    <section>
        <SectionHeaderWithButton header={`Edit ${cocktail.name}`}>
          <Button to={parentRoute}>Back</Button>
        </SectionHeaderWithButton>
      </section>
      <CocktailForm cocktail={cocktail} ingredients={ingredients} />
  </AuthenticationGuard>;
};

export default CocktailEditView;
