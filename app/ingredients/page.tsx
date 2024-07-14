import React from 'react';
import { Page } from '../../src/types';
import { useCocktails } from '../../src/features/cocktails/hooks/useCocktails';
import { useIngredients } from '../../src/features/cocktails/hooks/useIngredients';
import SectionHeaderWithButton from '../../src/shared/components/typography/SectionHeaderWithButton';
import IngredientList from '../../src/features/cocktails/components/ingredients/IngredientList';

const IngredientListView: Page = async () => {
  const ingredients = await useIngredients();
  const cocktails = await useCocktails({});

  return (
    <div>
      <SectionHeaderWithButton header='Ingredients' backButton />
      <IngredientList ingredients={ingredients} cocktails={cocktails} />
    </div>
  );
};

export default IngredientListView;
