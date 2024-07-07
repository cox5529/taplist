import React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';

import { auth } from '../../../../firebase';
import LoadingBox from '../../../../shared/components/LoadingBox';
import Button from '../../../../shared/components/buttons/Button';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import SectionHeader from '../../../../shared/components/typography/SectionHeader';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import { useCocktail } from '../../hooks/useCocktail';
import { getIngredientString } from '../../util/getIngredientString';
import SectionHeaderWithButton from '../../../../shared/components/typography/SectionHeaderWithButton';
import { useCocktails } from '../../hooks/useCocktails';
import MenuItem from '../../components/menu/MenuItem';

const CocktailDetailsView: React.FC = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const [cocktail, isLoading] = useCocktail(id ?? '');
  const [relatedCocktails, areRelatedCocktailsLoading] = useCocktails({
    ids: cocktail?.relatedRecipes ?? [],
  });

  if (isLoading) {
    return <LoadingBox />;
  }

  if (!cocktail) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex gap-12 flex-col'>
      <section>
        <SectionHeaderWithButton header={cocktail?.name} backButton>
          {user && <Button to='edit'>Edit</Button>}
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

export default CocktailDetailsView;
