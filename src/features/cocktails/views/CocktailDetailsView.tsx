import React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';

import { auth } from '../../../firebase';
import LoadingBox from '../../../shared/components/LoadingBox';
import Button from '../../../shared/components/buttons/Button';
import Paragraph from '../../../shared/components/typography/Paragraph';
import SectionHeader from '../../../shared/components/typography/SectionHeader';
import SubsectionHeader from '../../../shared/components/typography/SubsectionHeader';
import { useCocktail } from '../hooks/useCocktail';
import { getIngredientString } from '../util/getIngredientString';

const CocktailDetailsView: React.FC = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const [cocktail, isLoading] = useCocktail(id ?? '');

  if (isLoading) {
    return <LoadingBox />;
  }

  if (!cocktail) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex gap-12 flex-col'>
      <section>
        <div className='flex justify-between items-center pb-2 gap-2'>
          <SectionHeader>{cocktail?.name}</SectionHeader>
          <span className='flex-grow'></span>
          {user && <Button to='edit'>Edit</Button>}
          <Button to='/'>Back</Button>
        </div>
        <Paragraph>{cocktail?.description}</Paragraph>
      </section>
      <section>
        <SubsectionHeader>Ingredients</SubsectionHeader>
        <ul>{cocktail.ingredients?.map((x, i) => <li key={i}>{getIngredientString(x)}</li>)}</ul>
      </section>
      <section>
        <SubsectionHeader>Steps</SubsectionHeader>
        <ol className='list-decimal'>{cocktail?.instructions.map((x, i) => <li key={i}>{x}</li>)}</ol>
      </section>
    </div>
  );
};

export default CocktailDetailsView;
