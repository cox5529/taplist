import React from 'react';

import { useCocktail } from '../../../src/features/cocktails/hooks/useCocktail';
import { useCocktails } from '../../../src/features/cocktails/hooks/useCocktails';
import SectionHeaderWithButton from '../../../src/shared/components/typography/SectionHeaderWithButton';
import Button from '../../../src/shared/components/buttons/Button';
import Paragraph from '../../../src/shared/components/typography/Paragraph';
import SubsectionHeader from '../../../src/shared/components/typography/SubsectionHeader';
import { getIngredientString } from '../../../src/features/cocktails/util/getIngredientString';
import MenuItem from '../../../src/features/cocktails/components/menu/MenuItem';
import { Page } from '../../../src/types';
import AuthenticationGuard from '../../../src/shared/components/auth/AuthenticationGuard';

type Params = {
  id: string;
};

const CocktailDetailsView: Page<Params> = async ({ params }) => {
  const id = params.id;
  const cocktail = await useCocktail(id);
  const relatedCocktails = await useCocktails({
    ids: cocktail?.relatedRecipes ?? [],
  });

  if (!cocktail) {
    return <></>;
  }

  return (
    <div className='flex gap-12 flex-col'>
      <section>
        <SectionHeaderWithButton header={cocktail?.name} backButton>
          <AuthenticationGuard>
            <Button to='edit'>Edit</Button>
          </AuthenticationGuard>
        </SectionHeaderWithButton>
        <Paragraph>{cocktail?.description}</Paragraph>
      </section>
      <section>
        <SubsectionHeader>Ingredients</SubsectionHeader>
        <ul>{cocktail.ingredients?.map((x, i) => <li key={i}>{getIngredientString(x)}</li>)}</ul>
      </section>
      <section>
        <SubsectionHeader>Steps</SubsectionHeader>
        <ol className='list-decimal ml-4'>{cocktail?.instructions.map((x, i) => <li key={i}>{x}</li>)}</ol>
      </section>
      <section>
        <SubsectionHeader>Related Recipes</SubsectionHeader>
        <div className='flex flex-col gap-2'>
          {relatedCocktails.map((x, i) => (
            <MenuItem key={i} cocktail={x} />
          ))}
        </div>
      </section>
    </div>
  );
};

export async function generateStaticParams() {
  const cocktails = await useCocktails({});
  const paths = cocktails.map((cocktail) => ({
    id: cocktail.id,
  }));

  return paths;
}

export default CocktailDetailsView;
